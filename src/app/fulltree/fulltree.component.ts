import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from '@circlon/angular-tree-component';
import { DTreeNodeComponent } from '../dtreenode/dtreenode.component';

const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) {
        TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
      }
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event)
    },
    mouseOver: (tree, node, $event) => {
      $event.preventDefault();
      console.log(`mouseOver ${node.data.uuid}`);
    },
    mouseOut: (tree, node, $event) => {
      $event.preventDefault();
      console.log(`mouseOut ${node.data.uuid}`);
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-fulltree',
  styles: [
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  templateUrl: './fulltree.component.html'
})

export class FullTreeComponent implements OnInit {
  nodes: DTreeNodeComponent[];
  //nodes2 = [{name: 'root'}, {name: 'root2'}];
  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'ui_expanded',
    idField: 'ui_uuid',
    hasChildrenField: 'nodes',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    allowDrag: (node) => {
      // console.log('allowDrag?');
      return true;
    },
    allowDrop: (node) => {
      // console.log('allowDrop?');
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true
  };
  constructor() {
  }
  ngOnInit() {
    setTimeout(() => {
      this.nodes = [
        {
          ui_uuid: '1',
          ui_expanded: true,
          isAnswer: false,
          qCode: "mde_cred_0001",
          qType: 1,
          qRequired: true,
          qText: "Do you have a masters degree?",
          optionValue: "question",
          children: [
            {
              isAnswer: true,
              ui_expanded: true,
              answerText: "Yes",
              ui_uuid: '1.1',
              qCode: "mde_cred_0002",
              qType: 4,
              qRequired: true,
              qText: "What school did you attend?",
              optionValue: "question",
              hasChildren: false
            }, {
              isAnswer: true,
              ui_expanded: true,
              answerText: "No",
              ui_uuid: '1.2',
              optionValue: "branchend",
              pass: false,
              messageText: "You do not qualify for a permit at this time.",
              hasChildren: false,
            }
          ]
        }
      ];
    }, 1);
  }

  getChildren(node: DTreeNodeComponent) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(this.asyncChildren.map((c) => {
    //     return Object.assign({}, c, {
    //       hasChildren: node.level < 5
    //     });
    //   })), 2000);
    // });
    return null;
  }

  addNode(tree: any) {
    this.nodes[0].children.push({

      name: 'a new child'
    });
    tree.treeModel.update();
  }

  childrenCount(node: DTreeNodeComponent): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text: string, tree: any) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree: any) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  onEvent(event: any) {
    console.log(event);
  }

  onInitialized(tree: any) {
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  go($event: any) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel: TreeModel) {
    console.log(treeModel.activeNodes);
  }
}
