import './Advice.css';

const Advice =({message, author, error, loading})=>{
  if(loading){
    return <div className='advice'>Loading...</div>;
  }
  if (error) {
    return <div className='advice'>Error: {error.message}</div>;
}
return(
  <div className='advice'>
  <span className='adviceMsg'>{message}</span><br/>
  <span className='adviceAuthor'>{author}</span>
  </div>
  );
};
export default Advice;