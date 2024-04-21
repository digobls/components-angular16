export interface TableHeader {
  key: string;
  label: string;
  isVisible?: boolean;
  sortable: boolean;
  sortOrder?: 'asc' | 'desc';

  // Pipe and type
  usePipe?: boolean,
  isDate?: boolean,
  isCurrency?: boolean,
  isDocument?: boolean
  isPhone?: boolean,
  isJson?: boolean,
  jsonKey?: string

  // Actions
  actions?: {
    type?: string,
    icon?: string;
    label?: string;
    link?: string;
    pathname?: string[];
    params?: string[];
    externalLink?: string;
    target?: string;
    demo?: boolean;
    permission?: boolean;
  }[];
}
