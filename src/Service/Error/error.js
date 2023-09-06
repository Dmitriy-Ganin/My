import { Alert, Space } from 'antd'

export const Error = ({ text }) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert style={{ marginBottom: 20 }} message={text} type="warning" showIcon />
  </Space>
)
