import { useContext, For } from 'solid-js'
import type { VoidComponent } from 'solid-js'
import { useLocation } from '@solidjs/router'
import clsx from 'clsx'

import type { Device } from '~/types'

import Icon from '~/components/material/Icon'
import List, { ListItem, ListItemContent } from '~/components/material/List'
import Typography from '~/components/material/Typography'
import { DashboardContext } from '../Dashboard'

type DeviceListProps = {
  class?: string
  devices: Device[]
}

const DeviceList: VoidComponent<DeviceListProps> = (props) => {
  const { setDrawer } = useContext(DashboardContext)!
  const location = useLocation()

  return (
    <List variant="nav" class={clsx(props.class)}>
      <For each={props.devices}>
        {(device) => {
          const isSelected = () => location.pathname.includes(device.dongle_id)
          const onClick = () => setDrawer(false)
          return (
            <ListItem
              variant="nav"
              leading={<Icon>directions_car</Icon>}
              selected={isSelected()}
              onClick={onClick}
              href={`/${device.dongle_id}`}
            >
              <ListItemContent
                headline={device.alias}
                subhead={
                  <Typography class="lowercase" variant="label-sm">
                    {device.dongle_id}
                  </Typography>
                }
              />
            </ListItem>
          )
        }}
      </For>
    </List>
  )
}

export default DeviceList
