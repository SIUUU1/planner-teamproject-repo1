import { ResponsivePie } from '@nivo/pie'


const SchedulerChart = ({ data }) => {
  const transformedData = data.map(item => ({
    id: item.schedule_name, // id를 schedule_name으로
    ...item
  }));
  return(
    <ResponsivePie
        data={transformedData}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        activeInnerRadiusOffset={9}
        activeOuterRadiusOffset={7}
        colors={{ scheme: 'purple_blue_green' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0.3'
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabel={e=>e.id}
        arcLinkLabelsTextColor={{ theme: 'labels.text.fill' }}
        arcLinkLabelsOffset={-7}
        arcLinkLabelsDiagonalLength={20}
        arcLinkLabelsStraightLength={18}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabel={e=>e.id}
        arcLabelsRadiusOffset={0.6}
        arcLabelsSkipAngle={6}
        arcLabelsTextColor="black"
        motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0
        }}
    />
  )
}

export default SchedulerChart;