import { ResponsiveBar } from '@nivo/bar';
import useMove from '../util/useMove';

const Attainment = ({ data, padding }) => {
    const modifiedData = [{...data, attainment_name: data.attainment_name ? data.attainment_name.slice(0, 5) : "Unknown"
    }];
    const onClick=useMove(`../attainmentDetail/${data.attainment_no}`);
    return (
        <div className="attainmentItem" style={{ height: `70px` }} onClick={onClick}>
            <ResponsiveBar
                data={modifiedData}
                keys={['',' ','  ','attainment_rate']}
                indexBy="attainment_name"
                margin={{ top: 10, right: 20, bottom: 30, left: 62 }}
                padding={padding}
                maxValue={100}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'purple_blue' }}
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
            />
        </div>

    )
}
export default Attainment;