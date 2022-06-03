import { Calendar, Select, Radio, Col, Row } from 'antd'
import Styles from '../public/style/components/diycalendar.module.css'

const { Group, Button } = Radio



const DiyCalendar = () => {

  return (
    <div className={Styles.caldiv}>
    <div style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: 4 }}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option className="month-item" key={`${index}`}>
                {months[index]}
              </Select.Option>,
            );
          }
          const month = value.month();

          const year = value.year();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
            <div style={{ padding: 2 }}>
              <div style={{ marginBottom: '5px' }}>日历表 </div>
              <Row type="flex" justify="space-between">
                <Col>
                  <Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                    <Button value="month">月</Button>
                    <Button value="year">年</Button>
                  </Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    onChange={newYear => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                    value={String(year)}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={selectedMonth => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth, 10));
                      onChange(newValue);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          )
        }}
      />
    </div>
    </div>
  )
}

export default DiyCalendar

