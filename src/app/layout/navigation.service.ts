import { Injectable } from '@angular/core';

import { NavigationNode } from './sidebar/navigation-node';

@Injectable()
export class NavigationService {

  search: string = "";
  private _navItems: NavigationNode[] = [];

  constructor() {
    this._navItems.push(new NavigationNode(0, "root"));
    for (let i = 1; i < 5; i++) {
      this._navItems.push(new NavigationNode(i, `Teste ${i}`, true, "example/full-template", 16));
    }
    this._navItems.push(new NavigationNode(11, `Grid`, false, "example/grid", 15));
    this._navItems.push(new NavigationNode(12, `Buttons`, false, "example/buttons", 15));
    this._navItems.push(new NavigationNode(13, `Tables`, false, "example/table", 17));
    this._navItems.push(new NavigationNode(14, `Color Scheme`, false, "example/color-scheme", 17));
    this._navItems.push(new NavigationNode(15, `Sub-menu`, true, "", 0));
    this._navItems.push(new NavigationNode(16, `Sub-menu 2`, true, "", 15));
    this._navItems.push(new NavigationNode(17, `Sub-menu 3`, true, "", 16));
  }

  buildTree(nodes: NavigationNode[]): NavigationNode {
    let _nodes: NavigationNode[] = this.copy(nodes);
    _nodes.sort(
      (a: NavigationNode, b: NavigationNode) => {
        return a.parent - b.parent;
      }
    );
    let map = {}, node, root: NavigationNode;
    for (var i = 0; i < _nodes.length; i++) {
      node = _nodes[i];
      node.children = [];
      map[node.id] = i; // use map to look-up the parents
      if (typeof node.parent === "undefined" || node.parent === null) {
        root = node;
      } else {
        _nodes[map[node.parent]] = _nodes[map[node.parent]] || new NavigationNode();
        _nodes[map[node.parent]].children.push(node);
      }
    }
    return root || new NavigationNode();
  }

  copy(items): NavigationNode[] {
    return <NavigationNode[]> JSON.parse(JSON.stringify(items));
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  get items(): NavigationNode[] {
    return this._navItems;
  }
}