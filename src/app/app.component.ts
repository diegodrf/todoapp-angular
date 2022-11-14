import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Mode } from 'src/models/enums/mode.enum';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: Mode = Mode.List;
  public todos: Todo[] = [];
  public title: String = "Minhas tarefas";
  public form: FormGroup;

  titleControl = new FormControl('', Validators.compose([
    Validators.minLength(3),
    Validators.maxLength(60),
    Validators.required])
  );

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      title: this.titleControl
    });

    this.loadTodos();
  }

  remove(todo: Todo) {
    const index: number = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.save();
    }
  }

  add() {
    let id = this.todos.length + 1;
    let title = this.titleControl.value!;
    let todo = new Todo(id, title);
    this.todos.push(todo);
    this.save();
    this.resetForm();
    this.changeMode();
  }

  private save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  private loadTodos() {
    let _ = localStorage.getItem("todos") ?? "[]";
    this.todos = JSON.parse(_);
  }

  private resetForm() {
    this.form.reset();
    this.save();
  }

  setDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  setUnDone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  changeMode() {
    if (this.mode === Mode.List) {
      this.mode = Mode.Add;
    } else {
      this.mode = Mode.List;
    }
  }

  cancel() {
    this.resetForm();
    this.mode = Mode.List;
  }
}
