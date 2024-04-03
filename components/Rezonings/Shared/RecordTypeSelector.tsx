import { Button } from 'antd'

export function RecordTypeSelector({type, format}: {type: 'rezoning' | 'development permit', format: 'map' | 'table'}) {

  return (
    <>
      <a href='/rezonings/map'>
        <Button type={(type === 'rezoning' && format === 'map') ? 'primary' : undefined} style={{marginRight: 10}}>Rezoning map</Button>
      </a>
      <a href='/rezonings/table'>
        <Button type={(type === 'rezoning' && format === 'table') ? 'primary' : undefined} style={{marginRight: 10}}>Rezoning table</Button>
      </a>
      <a href='/development-permits/map'>
        <Button type={(type === 'development permit' && format === 'map') ? 'primary' : undefined} style={{marginRight: 10}}>Development permit map</Button>
      </a>
      <a href='/development-permits/table'>
        <Button type={(type === 'development permit' && format === 'table') ? 'primary' : undefined} style={{marginRight: 10}}>Development permit table</Button>
      </a>
    </>
  )

}
