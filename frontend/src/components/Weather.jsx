import './Weather.css'
const Weather =({date, skyState, ptyState, error, loading})=>{
  
  if(loading){
    return <div className='weather'>Loading...</div>;
  }
  if (error) {
    return <div className='weather'>Error: {error.message}</div>;
}
return(
  <>
  <div className='weather'>
  <span className='weatherDate'>{date}</span><br/>
  <span className='weatherState'>{skyState} {ptyState}</span>
  </div>
  </>
);
};
export default Weather;
