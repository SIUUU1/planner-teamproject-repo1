import './UserChart.css';
import ChartItem from '../components/ChartItem';
import useDataTransformer from '../util/useDataTransformer';
import useLoading from '../util/useLoading';

const UserChart=()=>{
  // const { data:cumulativeSalesData, loading:cumulativeSalesLoading, refetch:cumulativeSalesRefetch } = useLoading('http://localhost:8080/api/pay/cumulativeSalesByDate', 'json');
  // const modifyUserCount = useDataTransformer(userCountData || [], '누적 회원');
  const { data:shortData, loading:shortLoading, refetch:shortRefetch } = useLoading('http://localhost:8080/api/user/attainments/monthlyShortTermAttainmentRate', 'json');
  const modifyshort= useDataTransformer(shortData || [], '단기');

  const { data:longData, loading:longLoading, refetch:longRefetch } = useLoading('http://localhost:8080/api/user/attainments/monthlyLongTermAttainmentRate', 'json');
  const modifyLong = useDataTransformer(longData || [], '장기');


  return(
    <div className="userChart">
      <div className="userChartContent backWhite">
        <h1 style={{textAlign:"center"}}>나의 달성률 통계</h1>
        <div className='userChartItemList'>
          <div className='userChartItem' style={{width:'100%', height:'350px'}}>
            <h3>단기 목표 통계</h3>
            <ChartItem data={modifyshort} bottomTitle=" " leftTitle="달성률"/>
          </div>
          <div className='userChartItem' style={{width:'100%', height:'350px'}}>
            <h3>장기 목표 통계</h3>
            <ChartItem data={modifyLong} bottomTitle=" " leftTitle="달성률"/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserChart;