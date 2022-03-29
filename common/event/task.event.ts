export class CreateTaskEvent {
  constructor(
    public readonly title: string,
    public readonly desc: string,
    public readonly ownerId: number,
  ) { }
}

export class UpdateTaskEvent {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly desc: string,
  ) { }
}

export class DeleteTaskEvent {
  constructor(public readonly id: number) { }
}
