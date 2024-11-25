export interface ItemType {
  label: string;
  value: string;
}
export interface PackageType extends ItemType {
  img: string;
}
export interface SignalType extends ItemType {
  color: string;
}

export interface FilterFormDataType {
  packages?: PackageType[];
  signals?: SignalType[];
  categories?: ItemType[];
  timeFrame?: string;
  sorts?: Record<string, boolean>;
}
