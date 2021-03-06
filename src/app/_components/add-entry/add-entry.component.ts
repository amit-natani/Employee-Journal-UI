import { Component, OnInit, Input, TemplateRef, ComponentFactoryResolver, ViewChild, isDevMode, ElementRef } from '@angular/core';
import { EntryService } from '../../_services/entry.service';
import { EntryTypeService } from '../../_services/entry-type.service';
import { Entry } from '../../_models/entry';
import { DynamicContentDirective } from '../../_directives/dynamic-content.directive';
import { DynamicContentService } from '../../_services/dynamic-content.service';
import { DynamicComponent } from '../../dynamic-component';
import { UserService } from '../../_services/user.service';
import { TagService } from 'src/app/_services/tag.service';
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  @ViewChild('selectElem') el:ElementRef;
  @Input() myTemplate: TemplateRef<any>;

  @ViewChild(DynamicContentDirective) adHost: DynamicContentDirective;

  users: any[];
  entryTypes: any[];
  rootEntryTypes: any[];
  entry: Entry;
  sharingLevels: object[];
  cities: any[];
  selectedUsers: string[];
  selectedCityIds: string[];
  custom_page: string;
  projects: any[];
  instance: any;

  constructor(
    private userService: UserService, 
    private entriesService: EntryService,
    private entryTypesService: EntryTypeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dynamicContentservice: DynamicContentService,
    private tagService: TagService) { }

  ngOnInit() {
    this.entry = new Entry();
    this.getUsers();
    this.getRootEntryTypes();
    this.sharingLevels = [{
      key: 'private',
      value: 'Private (Self only)'
    }, {
      key: 'public',
      value: 'Public (Everyone)'
    }, {
      key: 'managers',
      value: 'Managers (Only manager/skip level manager)'
    }, {
      key: 'custom',
      value: 'Custom (Select a custom set of users)'
    }, {
      key: 'colleagues',
      value: 'Colleagues (Other people whom are directly connected to you)'
    }, {
      key: 'tagged_users',
      value: 'Tagged users only'
    }]
    this.cities = [
      {id: 1, name: 'Vilnius'},
      {id: 2, name: 'Kaunas'},
      {id: 3, name: 'Pavilnys', disabled: true},
      {id: 4, name: 'Pabradė'},
      {id: 5, name: 'Klaipėda'}
    ];
  }

  ngAfterViewInit() {
    const _this = this;
    setTimeout(function() {
      $("#description-textarea").textcomplete([
        {
          match: /(^|\s)#(\w*(?:\s*\w*))$/,
          search: function(query, callback) {
            // _this.handleQuery(query, callback)
            let lastQuery = query;
            _this.tagService.getOpenSuggestions(query)
            .subscribe(suggestions => {
              callback(suggestions);
            })
          },
          // #5 - Template used to display each result obtained by the Algolia API
          template: function (hit) {
            return hit;
          },
          // #6 - Template used to display the selected result in the textarea
          replace: function (hit) {
            return ' #' + hit.trim() + ' ';
          }
        }
      ], {
          // footer: '<div style="text-align: center; display: block; font-size:12px; margin: 5px 0 0 0;">Powered by <a href="http://www.algolia.com"><img src="https://www.algolia.com/assets/algolia128x40.png" style="height: 14px;" /></a></div>'
      });
    }, 2000)
    
  }

  handleQuery(query, callback): void {
    
  }

  loadDynamicComponent(componentUrl) {
    let dynamicItem = this.dynamicContentservice.getDynamicContent(componentUrl);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    this.instance = <DynamicComponent>componentRef.instance
    this.instance.data = dynamicItem.data;
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users
    })
  }
  
  getRootEntryTypes(): void {
    this.entryTypesService.getRootEntryTypes()
    .subscribe(entryTypes => {
      this.rootEntryTypes = entryTypes;
    })
  }

  getSubEntryTypes(): void {
    this.entry.entry_type_id = null
    this.entryTypesService.getSubEntryTypes(this.entry['root_entry_type_id'])
    .subscribe(entryTypes => {
      this.entryTypes = entryTypes;
    })
  }

  getCustomFields(): void {
    this.entry.content = {}
    this.entry.title = "";
    this.entry.description = "";
    this.entry.sharee_ids = [];
    this.entry.sharing_level = undefined;
    this.entry.tagged_user_ids = [];
    this.entryTypesService.getCustomFields(this.entry['entry_type_id'])
    .subscribe(customFields => {
      this.loadDynamicComponent(customFields.custom_fields.create_url);
      this.custom_page = "add-entry/add_templates" + customFields.custom_fields.create_url
    })
  }

  handleAccessibilityChange = function () {
    this.entry.sharee_ids = []
  }

  saveEntry () {
    this.entry.content = this.instance.data;
    let errors = []
    if (this.entry.root_entry_type_id == undefined) {
      errors.push("Entry domain can't be blank")
    }
    if (this.entry.entry_type_id == undefined) {
      errors.push("Entry type can't be blank")
    }
    if (this.entry.description == "" || this.entry.description == undefined) {
      errors.push("Description can't be blank")
    }
    if (this.entry.sharing_level == undefined) {
      errors.push("Sharing level can't be blank")
    }
    if(this.entry.sharing_level == 'custom' && this.entry.sharee_ids.length == 0) {
      errors.push("Select users to share")
    }
    if(errors.length == 0) {
      this.entriesService.saveEntry(this.entry).subscribe(response => {
        this.entry = new Entry();
        this.instance = null;
        alert("Entry created successfully")
      }, errors => {
        alert(errors.error)
      })
    } else {
      alert(errors)
    }
  }

}
