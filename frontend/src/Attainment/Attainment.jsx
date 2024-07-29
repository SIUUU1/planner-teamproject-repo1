import { ResponsiveBar } from '@nivo/bar'

const Attainment = ({ data, padding, type }) => {
    const modifiedData = data.map(item => ({
        ...item,
        attainmentName: item.attainmentName.slice(0, 4)
    }));

    return (
        <ResponsiveBar 
          data={modifiedData}
          keys={['attainmentRate']}
          indexBy="attainmentName"
          margin={{ top: 10, right: 20, bottom: 30, left: 62 }}
          padding={padding}
          maxValue={100}
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'pastel1' }}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      1.6
                  ]
              ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
              tickSize: 0,
              tickPadding: 9,
              tickRotation: 0,
              legend: '',
              legendPosition: 'middle',
              legendOffset: 0,
              truncateTickAt: 0
          }}
          enableGridY={false}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          onClick={(node, event) => {
            // 데이터에서 해당 항목의 attainmentId를 찾음
            const clickedItem = data.find(item => item.attainmentName === node.indexValue);
            if (clickedItem) {
                window.location.href = `attainmentDetail/${type}/${clickedItem.attainmentId}`;
            }
        }}
      />

)
}
export default Attainment;