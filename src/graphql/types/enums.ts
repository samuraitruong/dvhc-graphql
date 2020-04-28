import { registerEnumType } from 'type-graphql';

export enum DVHCTypes {
  THANH_PHO = 'Thành phố',
  TINH = 'Tỉnh',
  THI_XA = 'Thị xã',
  QUAN = 'Quận',
  HUYEN = 'Huyện',
  PHUONG = 'Phường',
  XA = 'Xã',
  THI_TRAN = 'Thị trấn',
}

registerEnumType(DVHCTypes, {
  name: 'DVHCTypes', // this one is mandatory
  description: 'List of DVHCs', // this one is optional
});
