export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export enum TasksFilter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}