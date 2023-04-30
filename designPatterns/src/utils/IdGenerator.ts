export class IdGenerator {
  private static instance: IdGenerator;

  public static getInstance () {
    this.instance ||= new IdGenerator();

    return this.instance
  }

  private lastId: number = 0;

  private constructor() {
    console.log('IdGenerator constructor')
  }

  getUniqueId (): number {
    return ++this.lastId;
  }
}