import { DeviceInfo } from 'src/notification/models/deviceInfo.model';

export const DeviceInfoProvider = [
  {
    provide: 'DEVICE_INFO_REPOSITORY',
    useValue: DeviceInfo,
  },
];
