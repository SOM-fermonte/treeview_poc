import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from '@circlon/angular-tree-component';

@Component({
  selector: 'app-dtreenode',
  styleUrls: ['./dtreenode.component.css'],
  templateUrl: './dtreenode.component.html'
})
export class DTreeNodeComponent extends TreeNode implements OnInit {
  ui_uuid: string;
  ui_expanded?: boolean = true;
  qCode?: string;
  qType?: number;
  qRequired?: boolean;
  qText?: string;
  optionValue?: string;
  pass?: boolean;
  messageText?: string;
  isAnswer?: boolean;
  answerText?: string;
  children: DTreeNodeComponent[];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}