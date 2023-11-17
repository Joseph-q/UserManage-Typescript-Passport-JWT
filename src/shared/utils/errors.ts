class ClientErr extends Error {
  public statusCode: number;
  constructor(msg: any, statusCode = 400) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export default ClientErr;
