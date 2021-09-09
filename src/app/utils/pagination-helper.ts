export class PaginationHelper {

  private totalEnregistrement = 0;
  private pageCourante = 0;
  private limiteVue = 0;
  private nombreMaximalBouton = 0;
  private pageTotal = 0;
  private action: string | any;


  getTotalEnregistrement(): number {
    return this.totalEnregistrement;
  }

  setTotalEnregistrement(value: number): PaginationHelper {
    this.totalEnregistrement = value;
    return this;
  }

  getPageCourante(): number {
    const pages = this.getPages();
    const tempPageCourante = pages.find(page => page === this.pageCourante);
    if (typeof tempPageCourante === 'undefined') {
      if (pages.length > 0) {
        this.pageCourante = pages[0];
      } else {
        this.pageCourante = 0;
      }
    } else {
      this.pageCourante = tempPageCourante;
    }
    return this.pageCourante;
  }

  getNombreDePage(): number {
    return Math.ceil(this.totalEnregistrement / this.limiteVue);
  }

  setPageCourante(value: number): PaginationHelper {
    this.pageCourante = value;
    return this;
  }

  getOffset(): number {
    return this.limiteVue;
  }

  setOffset(value: number): PaginationHelper {
    this.limiteVue = value;
    return this;
  }

  getNombreMaximalBouton(): number {
    return this.nombreMaximalBouton;
  }

  setNombreMaximalBouton(value: number): PaginationHelper {
    this.nombreMaximalBouton = value;
    return this;
  }

  setAction(action: string): PaginationHelper {
    this.action = action;
    return this;
  }

  getPages(): number[] {
    const pages: number[] = [];
    this.pageTotal = Math.ceil(this.totalEnregistrement / this.limiteVue);
    let startButton = 0;
    let endButton = 0;
    if (this.pageTotal <= this.nombreMaximalBouton) {
      startButton = 1;
      endButton = this.pageTotal;
    } else {
      const marge = (this.nombreMaximalBouton - 1) / 2;
      if (this.pageCourante > marge && this.pageCourante <= (this.pageTotal - marge)) {
        startButton = this.pageCourante - marge;
        endButton = this.pageCourante + marge;
      } else if (this.pageCourante <= marge) {
        startButton = 1;
        endButton = this.nombreMaximalBouton;
      } else if (this.pageCourante > (this.pageTotal - marge)) {
        startButton = this.pageTotal - this.nombreMaximalBouton + 1;
        endButton = this.pageTotal;
      }
    }

    for (let i = startButton; i <= endButton; i++) {
      pages.push(i);
    }

    return pages;
  }

  getPageTotal(): number {
    return this.pageTotal;
  }

  next(): void {
    this.pageCourante++;
    this.pageCourante = this.pageCourante > this.pageTotal ? this.pageTotal : this.pageCourante;
  }

  prev(): void {
    this.pageCourante--;
    this.pageCourante = this.pageCourante < 1 ? 1 : this.pageCourante;
  }

  getDebutVue(): number {
    const debut = (this.getPageCourante() - 1) * this.getOffset();
    return debut > 0 ? debut : 0;
  }
}
