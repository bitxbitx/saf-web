import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Grid } from '@mui/material';
import ChatSessionsSidebar from './ChatSessionsSidebar/ChatSessionsSidebar';
import ChatWindow from './ChatWindow/ChatWindow';
import LoadingIndicator from './LoadingIndicator/LoadingIndicator';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import styles from './LiveChat.module.css';
import { useMeQuery } from '../../../feature/services/auth/auth.services';
require('dotenv').config();

export default function LiveChat() {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [chatSessions, setChatSessions] = useState([]);
    const [activeChatIndex, setActiveChatIndex] = useState(null);
    const { data: meData, isLoading: meIsLoading, error: meError } = useMeQuery();

    useEffect(() => {
        // Create a new socket connection when the component mounts
        const newSocket = io(process.env.BACKEND_URL, {
            path: '/api/live-chat',
            transports: ['websocket'],
            timeout: 10000,
        });

        if (!meIsLoading) {
            console.log('Emitting init event');
            console.log('meData._id', meData.user._id)
            newSocket.emit('init', meData.user._id);
        }

        newSocket.on('receive message', (chatSessions) => {
            console.log('Received chat sessions:', chatSessions);
            setChatSessions(chatSessions);
            setIsLoading(false);
        });

        // Set the socket state to the new socket object
        setSocket(newSocket);

        // Clean up the socket connection when the component unmounts
        return () => {
            console.log('Disconnecting from server');
            newSocket.disconnect();
        };
    }, []);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (errorMessage) {
        return <ErrorMessage message={errorMessage} />;
    }


    console.log(activeChatIndex)

    function handleSendMessage(message) {
        console.log('Sending message:', message);
        socket.emit('send message', {
            sessionId: chatSessions[activeChatIndex]._id,
            message: message,
            userId: meData.user._id,
        });
    }

    function handleMarkAsDoneClick() {
        console.log('Marking chat as done:', chatSessions[activeChatIndex]._id);
        console.log('chatSessions[activeChatIndex]._id', chatSessions[activeChatIndex]._id)
        socket.emit('support:markAsDone',{
            userId: meData.user._id,
            sessionId: chatSessions[activeChatIndex]._id
        });
    }

    return (
        <Grid className={styles.container} container>
            <Grid item xs={3} sx={{
                height: '100%',
            }}>
                <ChatSessionsSidebar
                    socket={socket}
                    chatSessions={chatSessions}
                    activeChatId={activeChatIndex}
                    onChatItemClick={(index) => setActiveChatIndex(index)}

                />
            </Grid>
            <Grid item xs={9}>
                {/* Check if activeChatIndex is null */}
                {activeChatIndex === null && (
                    <div className={styles.noChatSelected}>
                        <h1>No chat selected</h1>
                    </div>
                )}
                {activeChatIndex !== null && (
                    <ChatWindow
                        socket={socket}
                        onMessageSend={(message) => handleSendMessage(message)}
                        onBackButtonClick={() => setActiveChatIndex(null)}
                        onMarkAsDoneClick={() => handleMarkAsDoneClick()}
                        chatName={chatSessions[activeChatIndex]?.name ?? 'Chat Name'}
                        messages={chatSessions[activeChatIndex]?.messages}
                    />
                )}
            </Grid>
        </Grid>
    );
}