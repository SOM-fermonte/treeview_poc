import { Component, Input, OnInit } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from '@circlon/angular-tree-component';
import { DTreeNodeComponent } from '../dtreenode/dtreenode.component';

const actionMapping: IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    // dblClick: (tree, node, $event) => {
    //   if (node.hasChildren) {
    //     TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    //   }
    // },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event)
    },
    mouseOver: (tree, node, $event) => {
      $event.preventDefault();
      // console.log(`mouseOver ${node.data.uuid}`);
    },
    mouseOut: (tree, node, $event) => {
      $event.preventDefault();
      // console.log(`mouseOut ${node.data.uuid}`);
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-fulltree',
  templateUrl: './fulltree.component.html'
})

export class FullTreeComponent implements OnInit {
  nodes: DTreeNodeComponent[];
  //nodes2 = [{name: 'root'}, {name: 'root2'}];
  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'ui_expanded',
    // idField: 'ui_uuid',
    hasChildrenField: 'nodes',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    levelPadding: 40,
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
              qCode: "mde_cred_0002",
              qType: 4,
              qRequired: true,
              qText: "What school did you attend?",
              optionValue: "question",
              children: []
            }, {
              isAnswer: true,
              ui_expanded: true,
              answerText: "No",
              optionValue: "branchend",
              pass: false,
              messageText: "You do not qualify for a permit at this time.",
              children: [],
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

  addNode(tree: any, node: any) {
    var newNode = {
      ui_expanded: true,
      isAnswer: false,
      optionValue: 'question',
      qCode: '',
      qRequired: true,
      qText: '',
      qType: 0,
      children: []
    };
    //hacky trick to make new questions be peers of the current node
    if (node.level == 1) {
      this.nodes.push(newNode);
    } else {
      node.parent.data.children.push(newNode);
    }
    tree.treeModel.update();
  }

  addOption(tree: any, node: any) {
    node.data.children.push({
      ui_expanded: true,
      isAnswer: true,
      answerText: '',
      qCode: '',
      qRequired: true,
      qText: '',
      qType: 0,
      children: []
    });
    tree.treeModel.update();
    tree.treeModel.expandAll();
  }

  removeNode(tree:any, node: any) {
    if (!(node.isRoot && (node.index == 0))){
      console.log(`Node level is ${node.level}`);
      if (node.level == 1){
        this.nodes.splice(node.index, 1)
      } else {
        node.parent.data.children.splice(node.index, 1);
      }
      tree.treeModel.update();
    }
  }

  clearTree(tree:any){
    this.nodes = [
      {
        ui_expanded: true,
        isAnswer: false,
        qCode: "",
        qType: 0,
        qRequired: false,
        qText: "",
        optionValue: "question",
        children: []
      }
    ]
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

  saveState(tree: any){
    console.log(`${JSON.stringify(this.nodes)}`);
  }
}
