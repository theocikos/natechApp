export abstract class AggregateRoot<Primitives = object> {
  protected readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  abstract toPrimitives(): Primitives;
}
