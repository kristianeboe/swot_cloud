import React from 'react'
import { Button, List } from 'semantic-ui-react'

const ItemRow = (item) => {
    return (
    <List.Item>
        <List.Content floated='right'>
            <div>{item.weight}</div>
        </List.Content>
        {/* <Image avatar src='/assets/images/avatar/small/lena.png' /> */}
        <List.Content>
            {item.description}
        </List.Content>
  </List.Item>
)}

export default ItemRow;