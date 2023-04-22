import { Alert, LinearProgress, Snackbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import NothingFoundSvg from '../../../../assets/img/NothingFound.svg';
import InfoCard from '../../../../components/InfoCard/InfoCard';
import { useDeletePromoCodeMutation, useGetPromoCodesQuery } from '../../../../feature/services/ecom/promoCode.services';
import styles from './PromoCodeList.module.css';

export default function PromoCodeList() {
    const history = useHistory();
    const { data, isLoading, error } = useGetPromoCodesQuery();
    const [deletePromoCode] = useDeletePromoCodeMutation();

    const handleEdit = (id) => {
        history.push(`/admin/promo-codes/${id}`);
    }

    const handleDelete = (id) => {
        deletePromoCode(id);
    }

    return (
        <>
            {/* Loading */}
            {isLoading && <LinearProgress color="primary" />}
            {/* Error Handling */}
            {error && <Snackbar open={true} autoHideDuration={6000}>
                <Alert severity="error">
                {error.message ? error.message : "Something went wrong! Please try again later."}
                </Alert>
            </Snackbar>}
            {/* Content */}
            <div className={styles.container}>
                {data?.promoCodes?.length > 0 ? data?.promoCodes?.map((promoCode) => (
                    <InfoCard
                        key={promoCode._id}
                        image={promoCode.image}
                        title={promoCode.code}
                        properties={{ "End Date": formatDate(promoCode.endDate), "Status": promoCode.status }}
                        editFunc={() => handleEdit(promoCode._id)}
                        deleteFunc={() => handleDelete(promoCode._id)}
                    />
                )) : <div className={styles.nothingFound}>
                    <img src={NothingFoundSvg} alt="Nothing Found" />
                    <h3>Nothing Found</h3>
                </div>}
            </div>
        </>
    )
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const ordinalDay = formattedDate.replace(/(\d{1,2})(st|nd|rd|th)/, (match, p1, p2) => {
      let suffix = '';
      if (p2 === 'st' && p1 !== '11') {
          suffix = 'st';
      } else if (p2 === 'nd' && p1 !== '12') {
          suffix = 'nd';
      } else if (p2 === 'rd' && p1 !== '13') {
          suffix = 'rd';
      } else {
          suffix = 'th';
      }
      return `${p1}${suffix}`;
    });
    return ordinalDay;
  }
  