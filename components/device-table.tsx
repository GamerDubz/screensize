import { CheckCircle2, Laptop, Monitor, Smartphone, Tablet, XCircle } from 'lucide-react'
import { COMMON_DEVICES, getDeviceClass } from '@/lib/constants'

const DEVICE_ICONS = {
  phone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  monitor: Monitor,
} as const

const MAX_DEVICE_WIDTH = Math.max(...COMMON_DEVICES.map((d) => d.width))

export function DeviceTable({ viewportWidth }: { viewportWidth: number }) {
  return (
    <section aria-labelledby="devices-heading" className="device-block">
      <h2 id="devices-heading" className="section-label">
        Device comparison
      </h2>
      <ul className="device-list">
        {COMMON_DEVICES.map((device) => {
          const fits = viewportWidth >= device.width
          const Icon = DEVICE_ICONS[getDeviceClass(device.width)]
          const barPct = (device.width / MAX_DEVICE_WIDTH) * 100
          return (
            <li key={device.name} className="device-row">
              <Icon aria-hidden="true" size={16} className="device-icon" />
              <span className="device-name">{device.name}</span>
              <span className="device-bar-track" aria-hidden="true">
                <span className="device-bar-fill" style={{ width: `${barPct}%` }} />
              </span>
              <span className="device-dims">
                {device.width}&times;{device.height}
              </span>
              <span className={fits ? 'device-fit device-fit-yes' : 'device-fit device-fit-no'}>
                {fits ? (
                  <CheckCircle2 aria-hidden="true" size={15} />
                ) : (
                  <XCircle aria-hidden="true" size={15} />
                )}
                {fits ? 'Fits' : 'Too wide'}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
