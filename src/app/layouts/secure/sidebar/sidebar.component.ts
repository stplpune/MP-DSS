import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  pageListArray = new Array();

  constructor() {
    let pageListData: any = [

      {
        "id": 1,
        "designationId": 1,
        "mainMenuId": 1,
        "mainMenu": "Dashboard",
        "subMenuId": 5,
        "subMenu": "Dashboard",
        "pageName": "Dashboard",
        "readRight": true,
        "writeRight": true,
        "deleteRight": true,
        "pageURL": "Dashboard",
        "menuIcon": "assets/images/sidebar-icons/Dashboard.svg",
        "isSideBarMenu": 1,
        "sortOrder": 1
      },
      {
        "id": 2,
        "designationId": 1,
        "mainMenuId": 2,
        "mainMenu": "Master",
        "subMenuId": 1,
        "subMenu": "",
        "pageName": "AI Toll Verification",
        "readRight": true,
        "writeRight": true,
        "deleteRight": true,
        "pageURL": "AI-Toll-Verification",
        "menuIcon": 'assets/images/sidebar-icons/circle.svg',
        "isSideBarMenu": 1,
        "sortOrder": 2
      },
      {
        "id": 3,
        "designationId": 1,
        "mainMenuId": 2,
        "mainMenu": "Master",
        "subMenuId": 1,
        "subMenu": "",
        "pageName": "AI Toll VehicleUpdate",
        "readRight": true,
        "writeRight": true,
        "deleteRight": true,
        "pageURL": "AI-Toll-VehicleUpdate",
        "menuIcon": 'assets/images/sidebar-icons/circle.svg',
        "isSideBarMenu": 1,
        "sortOrder": 3
      }, {
        "id": 14,
        "designationId": 1,
        "mainMenuId": 5,
        "mainMenu": "Setting",
        "subMenuId": 7,
        "subMenu": "Setting",
        "pageName": "Page right access",
        "readRight": true,
        "writeRight": true,
        "deleteRight": true,
        "pageURL": "page-right-access",
        "menuIcon": 'assets/images/sidebar-icons/Settings.svg',
        "isSideBarMenu": 1,
        "sortOrder": 14
      },
    ]
    let pageUrls = pageListData.filter((ele: any) => {
      if (ele.isSideBarMenu) {
        return ele;
      }
    });

    let pageList = new Array();

    pageUrls.find((item: any) => {
      let existing: any = pageList.filter((v: any) => {
        return v.subMenu == item.subMenu;
      });
      if (existing.length) {
        let existingIndex: any = pageList.indexOf(existing[0]);
        pageList[existingIndex].pageURL = pageList[existingIndex].pageURL.concat(item.pageURL);
        pageList[existingIndex].pageName = pageList[existingIndex].pageName.concat(item.pageName);
      } else {
        if (typeof item.pageURL == 'string')
          item.pageURL = [item.pageURL];
        item.pageName = [item.pageName];
        pageList.push(item);
      }
    });

    pageList.find((ele: any) => {
      if (this.pageListArray.length) {
        let findIndex: any = this.pageListArray.findIndex((item: any) => { return ele.mainMenuId == item.id });
        findIndex != "-1" ? (this.pageListArray[findIndex].subMenu = true, this.pageListArray[findIndex]?.data?.push(ele)) : this.pageListArray.push({ id: ele.mainMenuId, data: [ele], subMenu: false, mainMenu: ele.mainMenu });
      } else {
        this.pageListArray.push({ id: ele.mainMenuId, data: [ele], subMenu: ele.pageURL.length > 1 ? true : false, mainMenu: ele.mainMenu })
      }
    });

    this.setDefaultCollapse();
  }

  mouseOver(flag: boolean) {
    const div: any = document.getElementsByClassName('show')[0];
    flag ? div?.classList.remove('d-none') : div?.classList.add('d-none');
  }

  setDefaultCollapse() {
    this.pageListArray.map((ele: any) => {
      ele.collapseFlag = false;
      ele.activeFlag = false;
      if (ele.data.length > 1 && ele.subMenu) {// submenu
        ele.data.find((item: any) => {
          item.collapseFlag = false;
          item.activeFlag = false;
        })
      }
    })
  }

  onCloseSidebar() {
    // this.webStorage.setSidebarState(!this.webStorage.getSidebarState());
  }
  prevClosedDep(i: any, j?: any) {
    this.setDefaultCollapse();
    if (j || j == 0) {
      this.pageListArray[i].collapseFlag = true;
      this.pageListArray[i].activeFlag = true;
      this.pageListArray[i].data[j].collapseFlag = true;
      this.pageListArray[i].data[j].activeFlag = true;
    } else {
      this.pageListArray[i].collapseFlag = true;
      this.pageListArray[i].activeFlag = true;
    }
  }
}