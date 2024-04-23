import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-default-simple-table',
  templateUrl: './default-simple-table.component.html',
  styleUrls: ['./default-simple-table.component.scss']
})
export class DefaultSimpleTableComponent implements OnInit, OnChanges {
  // On loading data
  @Input() loadingList: boolean = false;

  // Data header and items
  @Input() listHeader: any = [];
  @Input() listData: any = [];

  // Display check header item view
  @Input() showDisplay: boolean = true;

  // Pagination
  @Input() paginationInfo: boolean = true;
  @Input() maxSize: number = 5;
  @Input() configPagination: {currentPage: number, totalRecords: number, totalRecordsPerPage: number} = {
    currentPage: 1,
    totalRecordsPerPage: 20,
    totalRecords: 0,
  };
  startTotalPages: number = 0;
  totalPages: number = 0;
  pagesToShow: number[] = [];

  // Items per page
  @Input() showChangeTotal: boolean = true;
  itemsPerPageOptions: number[] = [10, 20, 30, 40, 50, 60];

  // Events
  @Output() sendDataAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeListSort:EventEmitter<{order: string, key: string}> = new EventEmitter<{order: string, key: string}>();
  @Output() changePage: EventEmitter<{currentPage: number, totalRecordsPerPage: number, totalRecords: number}> = new EventEmitter<{currentPage: number, totalRecordsPerPage: number, totalRecords: number}>();

  constructor() { }

  ngOnChanges(): void { }

  ngOnInit() {
    this.calculateTotalPages();
    this.calculatePagesToShow();

    this.listHeader.forEach((value: any) => {
      value.isVisible = true;
    });
  }

  // Sort item from header
  sort(key: string, sortable = false) {
    if (sortable) {
      this.listHeader.forEach((v: any) => {
        if (v.key === key && v.sortable) {
          if (v.sortOrder === 'asc') {
            v.sortOrder = 'desc';
            this.changeListSort.emit({ order: v.sortOrder, key: key });
          } else {
            v.sortOrder = 'asc';
            this.changeListSort.emit({ order: v.sortOrder, key: key });
          }
        } else {
          v.sortOrder = null;
        }
      });
    }
  }

  // Send action click
  executeAction(action: any, row: any, i: number): void {
    this.sendDataAction.emit({ action, row, index: i });
  }

  // Create link path
  createLink(data: any, dataRow: any) {
    let dataLink = data.link;

    data?.pathname?.forEach((value: any) => {
      dataLink += `/${this.adjustStringUrl(dataRow[value])}`;
    });

    return dataLink || null;
  }

  // Create queryParams
  createParams(data: any, dataRow: any) {
    let queryParams: any = {};

    data?.params?.forEach((value: any) => {
      if (dataRow[value] !== undefined && dataRow[value] !== null) {
        queryParams[value] = this.adjustStringUrl(dataRow[value]);
      }
    });

    return queryParams || null;
  }

  // Adjust string to url
  adjustStringUrl(data: any): string {
    try {
      if (data !== undefined && data !== null) {
        return encodeURIComponent(data?.toString()?.trim()?.toLowerCase().replace(/\s+/g, ''));
      } else {
        return '';
      }
    } catch (e) {
      return '';
    }
  }

  // Start pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      if (this.configPagination.currentPage !== page) {
        this.configPagination.currentPage = page;
        this.calculatePagesToShow();
        this.changePage.emit(this.configPagination);
      }
    }
  }

  nextPage(): void {
    if (this.configPagination.currentPage < this.totalPages) {
      this.configPagination.currentPage++;
      this.calculatePagesToShow();
      this.changePage.emit(this.configPagination);
    }
  }

  previousPage(): void {
    if (this.configPagination.currentPage > 1) {
      this.configPagination.currentPage--;
      this.calculatePagesToShow();
      this.changePage.emit(this.configPagination);
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.configPagination.totalRecords / this.configPagination.totalRecordsPerPage);

    if (!this.startTotalPages) {
      this.startTotalPages = this.totalPages;
    }
  }

  calculatePagesToShow(): void {
    const maxSize = this.maxSize;
    const currentPage = this.configPagination.currentPage;
    const totalPages = this.totalPages;
    let startPage = Math.max(1, currentPage - Math.floor(maxSize / 2));
    let endPage = Math.min(totalPages, startPage + maxSize - 1);

    if (endPage - startPage + 1 < maxSize) {
      startPage = Math.max(1, endPage - maxSize + 1);
    }

    this.pagesToShow = Array.from({length: (endPage + 1) - startPage}, (_, i) => startPage + i);
  }

  onChangeItemsPerPage(value: number): void {
    this.configPagination.currentPage = 1;
    this.configPagination.totalRecordsPerPage = value;
    this.calculateTotalPages();
    this.calculatePagesToShow();
    this.changePage.emit(this.configPagination);
  }
}
