import { ResponsivePie } from '@nivo/pie'
import React from 'react';

const SchedulerChart = ({ data }) => {
  const chartData = data || [];
  const transformedData = chartData.map(item => ({
    id: item.schedule_name,
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
        tooltip={e => {
          let { datum: t } = e;
          const hours = Math.floor(t.value / 60);
          const minutes = Math.floor(t.value % 60);
          return (
            <div style={{ border: `1px solid ${t.color}`, padding: `3px 10px`, fontSize:`13px`}} className='backWhite'>
                  <span>{t.id} : </span>
                  <span style={{fontSize:`12px`, marginTop:`3px`}}>
                      {hours > 0 && `${hours}시간 `}{minutes}분
                  </span>
              </div>
          );
        }}      
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor={{ theme: 'labels.text.fill' }}
        arcLinkLabelsOffset={-7}
        arcLinkLabelsDiagonalLength={20}
        arcLinkLabelsStraightLength={18}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabel={e=>e.id}
        arcLabelsRadiusOffset={0.6}
        enableArcLabels={false}
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