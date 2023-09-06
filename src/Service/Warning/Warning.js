import { Alert, Space } from 'antd'

export const Warning = ({ text }) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message={text} type="info" showIcon />
  </Space>
)
