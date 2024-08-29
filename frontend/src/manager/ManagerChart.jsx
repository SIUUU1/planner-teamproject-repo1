import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
import ChartItem from '../components/ChartItem'
import useDataTransformer from "../util/useDataTransformer";
import useLoading from "../util/useLoading";

const ManagerChart=()=>{
  const { data:userCountData, loading:userCountLoading, refetch:userCountRefetch } = useLoading('http://localhost:8080/api/user/countByDate', 'json');
  const { data:payCountData, loading:payCountLoading, refetch:payCountRefetch } = useLoading('http://localhost:8080/api/pay/payCountByDate', 'json');
  const { data:dailySalesData, loading:dailySalesLoading, refetch:dailySalesRefetch } = useLoading('http://localhost:8080/api/pay/dailySalesByDate', 'json');
  const { data:cumulativeSalesData, loading:cumulativeSalesLoading, refetch:cumulativeSalesRefetch } = useLoading('http://localhost:8080/api/pay/cumulativeSalesByDate', 'json');
  const modifyUserCount = useDataTransformer(userCountData || [], '누적 회원');
  const modifyPayCount = useDataTransformer(payCountData || [], '누적 판매량');
  const modifyDailySales = useDataTransformer(dailySalesData || [], '일일 판매액');
  const modifyCumulativeSales = useDataTransformer(cumulativeSalesData || [], '누적 판매액');

  return(
    <div className="managerChart">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        <div className="managerChartList">
          <div className="managerChartItem" style={{width:'100%', height:'550px'}}>
            <h3>누적 회원 수</h3>
            <ChartItem data={modifyUserCount} bottomTitle="" leftTitle="누적 회원 수" isLegends={false}/>
          </div>
          <div className="managerChartItem" style={{width:'100%', height:'550px'}}>
            <h3>누적 판매량</h3>
            <ChartItem data={modifyPayCount} bottomTitle=" " leftTitle="누적 판매량"/>
          </div>
          <div className="managerChartItem" style={{width:'100%', height:'550px'}}>
            <h3>일일 판매액</h3>
            <ChartItem data={modifyDailySales} bottomTitle=" " leftTitle="일일 판매액"/>
          </div>
          <div className="managerChartItem" style={{width:'100%', height:'550px'}}>
            <h3>누적 판매액</h3>
            <ChartItem data={modifyCumulativeSales} bottomTitle=" " leftTitle="누적 판매액"/>
          </div>
        </div>
      </div>

    </div>
  )
}
export default ManagerChart;