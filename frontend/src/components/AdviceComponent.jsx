import './AdviceComponent.css';
import useLoading from '../util/useLoading';

const AdviceComponent =()=>{
  // const AdviceData = {
  //   user_id: '',
  //   user_name: '',
  //   image_url:'',
  //   user_email:'',
  //   user_tel: '',
  //   user_nickname: '',
  //   user_gender: '',
  //   user_birthday: '',
  //   password:'',
  // };

  const [advice, setAdvice] = useState(initUserState);
  const { data: adviceData, loading: loadingAdvice, error: errorAdvice } = useLoading('https://korean-advice-open-api.vercel.app/api/advice', 'json');
  
  if (loadingAdvice) {
    return <div>Loading...</div>;
  }

  if (errorAdvice) {
      return <div>Error: {errorAdvice.message}</div>;
  }
  return(
  <>
  <span>{adviceData.message}</span><br/>
  <span>{adviceData.author}</span>
  {/* <span>{adviceData.authorProfile}</span> */}
  </>
  );
};
export default AdviceComponent;