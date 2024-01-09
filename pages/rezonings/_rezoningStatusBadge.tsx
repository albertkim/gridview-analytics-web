import { Tag } from 'antd'

export default function RezoningStatusBadge({status}: {status: string}) {

  if (status === null) {
    return <Tag color='red'>{status}</Tag>
  } else if (status === 'applied') {
    return <Tag color='warning'>{status}</Tag>
  } else if (status === 'public hearing') {
    return <Tag color='warning'>{status}</Tag>
  } else if (status === 'approved') {
    return <Tag color='success'>{status}</Tag>
  } else if (status === 'denied') {
    return <Tag color='red'>{status}</Tag>
  }

}
