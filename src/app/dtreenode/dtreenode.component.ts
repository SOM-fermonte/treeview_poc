import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from '@circlon/angular-tree-component';

@Component({
  selector: 'app-dtreenode',
  styleUrls: ['./dtreenode.component.css'],
  templateUrl: './dtreenode.component.html'
})

export class DTreeNodeComponent extends TreeNode {
  qCode: string;
  qType: number;
  qRequired: boolean;
  qText: string;
  optionValue: string;
  pass: boolean;
  messageText: string;
  children: DTreeNodeComponent[];
}