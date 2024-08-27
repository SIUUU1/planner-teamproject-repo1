import ManagerMenuInfo from "./ManagerMenuInfo";
import './ManagerHome.css';
import ChartItem from '../components/ChartItem'
import useDataTransformer from "../util/useDataTransformer";
import useLoading from "../util/useLoading";

const ManagerChart=()=>{
  const { data:userCountData, loading:userCountLoading, refetch:userCountRefetch } = useLoading('http://localhost:8080/api/user/countByDate', 'json');
  const modifyUserCount = useDataTransformer(userCountData || [], 'userCountData');


  // const data=[
  //   {
  //     "id": "id",
  //     "data": [
  //       {
  //         "x": "plane",
  //         "y": 202
  //       },
  //       {
  //         "x": "helicopter",
  //         "y": 23
  //       },
  //       {
  //         "x": "boat",
  //         "y": 264
  //       },
  //       {
  //         "x": "train",
  //         "y": 270
  //       },
  //       {
  //         "x": "subway",
  //         "y": 118
  //       },
  //       {
  //         "x": "bus",
  //         "y": 237
  //       },
  //       {
  //         "x": "car",
  //         "y": 74
  //       },
  //       {
  //         "x": "moto",
  //         "y": 136
  //       },
  //       {
  //         "x": "bicycle",
  //         "y": 72
  //       },
  //       {
  //         "x": "horse",
  //         "y": 264
  //       },
  //       {
  //         "x": "skateboard",
  //         "y": 190
  //       },
  //       {
  //         "x": "others",
  //         "y": 226
  //       }
  //     ]
  //   },
  // ]
  return(
    <div className="managerChart">
      <div className="managerContent backWhite">
        <ManagerMenuInfo/>
        <div className="managerChartList">
          <div className="managerChartItem" style={{width:'100%', height:'400px'}}>
            <ChartItem data={modifyUserCount} bottomTitle="테스트1" leftTitle="테스트2"/>
          </div>
          <div className="managerChartItem" style={{width:'100%', height:'400px'}}>
            {/* <ChartItem data={data} bottomTitle="테스트1" leftTitle="테스트2"/> */}
          </div>
        </div>
      </div>

    </div>
  )
}
export default ManagerChart;