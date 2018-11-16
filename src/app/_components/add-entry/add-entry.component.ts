import { Component, OnInit, Input, TemplateRef, ComponentFactoryResolver, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ViewChildren, QueryList } from '@angular/core';
import { EntryService } from '../../_services/entry.service';
import { EntryTypeService } from '../../_services/entry-type.service';
import { Entry } from '../../_models/entry';
import { DynamicContentDirective } from '../../_directives/dynamic-content.directive';
import { DynamicContentInstantFeedbackDirective } from '../../_directives/dynamic-content-instant-feedback.directive';
import { DynamicContentService } from '../../_services/dynamic-content.service';
import { DynamicComponent } from '../../dynamic-component';
import { UserService } from '../../_services/user.service';
import { TagService } from 'src/app/_services/tag.service';
// import * as $ from 'jquery';
declare var $: any;
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EntryType } from 'src/app/_models/entry-type';
import { FeedbackOthersComponent } from '../../custom_templates/feedback-others/feedback-others.component';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit, AfterViewInit, AfterViewChecked {

  // @ViewChild('selectElem') el:ElementRef;
  // @Input() myTemplate: TemplateRef<any>;

  @ViewChildren('instnatFeedbacks') childFeedbacks: QueryList<FeedbackOthersComponent>;
  @ViewChild(DynamicContentDirective) dynamicContentHost: DynamicContentDirective;
  @ViewChild(DynamicContentInstantFeedbackDirective) dynamicContentInstantFeedbackHost: DynamicContentInstantFeedbackDirective;

  users: Observable<any>[];
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
  feedbackInstance: any;
  description: any;
  mentionedUsers: any[] = []
  mentionedTags: any[] = [];
  worklog_types: any[] = [];
  feedback_types: any[] = [];
  addFeedback: boolean = false;
  ableForFeedback: boolean = false;
  indexes: Number[] = []
  feedbackInitialData: Object = {
    data: {}
  }
  errors: any[] = [];
  feedbacks: Entry[] = [];
  objectKeys = Object.keys;
  showSuccessMessage: Boolean = false;
  currentFeedback: Entry = new Entry();
  showModal: Boolean = false;
  currentFeedbackIndex: any;


  // New Schema Test
  levelZeroEntryTypes: EntryType[] = []
  levelOneEntryTypes: EntryType[] = []
  levelTwoEntryTypes: EntryType[] = []

  constructor(
    private userService: UserService, 
    private entriesService: EntryService,
    private entryTypesService: EntryTypeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dynamicContentservice: DynamicContentService,
    private tagService: TagService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let feedbackEntry = new Entry();
    feedbackEntry.description = {
      text: ""
    }
    this.currentFeedback = feedbackEntry;
    this.entry = new Entry();
    // this.getUsers();
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

    // New Schema test
    this.getLevelZeroEntryTypes();
    this.getEntryTypesForButtons();
  }

  ngAfterViewInit() {
    // console.log("-------",this.childFeedback);
  }

  ngAfterViewChecked() {
    // console.log("-------",this.childFeedback);
  }

  loadDynamicComponent(componentUrl) {
    let dynamicItem = this.dynamicContentservice.getDynamicContent(componentUrl, {});
    if (dynamicItem) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicItem.component);

      let viewContainerRef = this.dynamicContentHost.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);
      this.instance = <DynamicComponent>componentRef.instance
      this.instance.data = dynamicItem.data;
    }
  }

  loadDynamicComponentInstantFeedback(componentUrl, data) {
    let dynamicItem = this.dynamicContentservice.getDynamicContent(componentUrl, data);
    if (dynamicItem) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicItem.component);

      let viewContainerRef = this.dynamicContentInstantFeedbackHost.viewContainerRef;
      viewContainerRef.clear();

      let componentRef = viewContainerRef.createComponent(componentFactory);
      this.feedbackInstance = <DynamicComponent>componentRef.instance
      this.feedbackInstance.data = dynamicItem.data;
    }
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
      this.route.params.subscribe(value => {
        let type = value.type;
        if(type != undefined) {
          let preselectedType = this.rootEntryTypes.find(entryType => entryType.name.toLowerCase() === type.toLowerCase())
          if (preselectedType != undefined) {
            this.entry.root_entry_type_id = preselectedType.id
            this.getSubEntryTypes();
          }
        }
      })
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
    // this.entry.title = "";
    this.entry.description = {};
    this.entry.shared_with = [];
    this.entry.sharing_level = undefined;
    this.entry.tagged_users = [];
    this.entryTypesService.getCustomFields(this.entry['entry_type_id'])
    .subscribe(customFields => {
      this.loadDynamicComponent(customFields.custom_fields.create_url);
      this.custom_page = "add-entry/add_templates" + customFields.custom_fields.create_url
    })
    const _this = this;
    setTimeout(function() {
      $("#autocomplete-textarea").textcomplete([
        {
          matchHash: /(^|\s)#(\w*(?:\s*\w*))$/,
          matchAtTheRate: /(^|\s)@(\w*(?:\s*\w*))$/,
          search: function(query, currentStrategy, callback) {
            let lastQuery = query;
            if(currentStrategy == "hash") {
              _this.tagService.getOpenSuggestions(query)
              .subscribe(suggestions => {
                callback(suggestions);
              })
            } else if (currentStrategy == "atTheRate") {
              _this.userService.getUsersByName(query)
              .subscribe(suggestions => {
                // let names = suggestions.employees.map(function(suggesstion) {return suggesstion.full_name})
                callback(suggestions.employees);
              })
            }
          },
          // #5 - Template used to display each result obtained by the Algolia API
          template: function (currentStrategy, hit) {
            if(currentStrategy == 'hash') {
              return hit;
            } else if (currentStrategy == 'atTheRate') {
              return hit.full_name;
            }
          },
          // #6 - Template used to display the selected result in the textarea
          replace: function (hit, currentStrategy) {
            if(currentStrategy == 'hash') {
              _this.mentionedTags.push(hit);
              var html = ' <a class="tag-item" href="">';
              html += '<span class="label">' + hit + '</span></a> ';
              return html;
            } else if (currentStrategy == 'atTheRate') {
              _this.mentionedUsers.push(hit);
              var html = ` <a class="tag-item-user ${hit.id}" href="">`;
              html += '<span class="label">' + hit.full_name + '</span></a> ';
              return html;
            }
          }
        }
      ], {
        adapter: $.fn.textcomplete.HTMLContentEditable,
          // footer: '<div style="text-align: center; display: block; font-size:12px; margin: 5px 0 0 0;">Powered by <a href="http://www.algolia.com"><img src="https://www.algolia.com/assets/algolia128x40.png" style="height: 14px;" /></a></div>'
      });
    }, 2000)

    setTimeout(function() {
      document.querySelector('#autocomplete-textarea').addEventListener('keydown', function(event) {
        // Check for a backspace
        if (event['which'] == 8) {
            let s = window.getSelection();
            let r = s.getRangeAt(0)
            let el = r.startContainer.parentElement.parentElement
            // Check if the current element is the .label
            if (el.classList.contains('tag-item') || el.classList.contains('tag-item-user')) {
                // Check if we are exactly at the end of the .label element
                if (r.startOffset == r.endOffset && r.endOffset == el.textContent.length) {
                    // prevent the default delete behavior
                    event.preventDefault();
                    if (el.classList.contains('highlight')) {
                        // remove the element
                        el.remove();
                    } else {
                        el.classList.add('highlight');
                    }
                    return;
                }
            }
        }
        // event.target.querySelectorAll('span.label.highlight').forEach(function(el) { el.classList.remove('highlight');})
      });
    }, 2000)
  }

  handleAccessibilityChange = function () {
    this.entry.shared_with = []
  }

  saveEntry () {
    let feedbackCustomData = this.childFeedbacks['_results'].map(function(result) {
      return result.data;
    });
    let customFeedbacks = this.feedbacks;
    // this.feedbacks.forEach(function(feedback, index) {
    //   let obj = feedback;
    //   obj.content = feedbackCustomData[index]
    //   customFeedbacks.push(obj)
    // })
    let children = $('#autocomplete-textarea')[0].children
    children = Array.prototype.slice.call( children )
    let userIds = []
    this.mentionedTags = []
    children.forEach(child => {
      if (child.classList.contains('tag-item') || child.classList.contains('label')) {
        this.mentionedTags.push(child.children[0].textContent)
      } else if (child.classList.contains('tag-item-user')) {
        userIds.push(child.classList[1]);
      }
    })
    let innerText = $('#autocomplete-textarea')[0].innerText
    let innerrHTML = $('#autocomplete-textarea')[0].innerHTML;
    this.formatMentionedUsers();
    this.checkForNewTags(innerText);
    this.formatMentionedTags();
    this.mentionedUsers = this.mentionedUsers.filter(user => {
      return userIds.includes(user.external_id.toString())
    })
    this.entry.description = {
      "html": innerrHTML,
      "text": innerText,
      "mentionedUsers": this.mentionedUsers,
      "tags": this.mentionedTags
    }
    let errors = []
    let entryErrors = {
      entry: []
    }
    errors.push(entryErrors)
    // if (this.entry.root_entry_type_id == undefined) {
    //   errors.push("Entry domain can't be blank")
    // }
    // if (this.entry.entry_type_id == undefined) {
    //   errors.push("Entry type can't be blank")
    // }
    if(this.entry.task_type_id == undefined || this.entry.task_type_id == null) {
      errors[0]['entry'].push("Please select task type")
    }
    if(this.entry.task_sub_type_id == undefined && this.levelTwoEntryTypes.length > 0) {
      errors[0]['entry'].push("Please select task sub-type")
    }
    if (innerText == "" || innerText == undefined) {
      errors[0]['entry'].push("Description can't be blank")
    }
    if (this.entry.sharing_level == undefined) {
      errors[0]['entry'].push("Sharing level can't be blank")
    }
    if(this.entry.sharing_level == 'custom' && this.entry.shared_with.length == 0) {
      errors[0]['entry'].push("Select users to share")
    }
    if(errors[0]['entry'].length == 0) {
      let customData = {}
      if (this.instance) {
        customData = this.instance.data;
        customData = this.frameCustomData(customData);
      }
      this.formatSharees();
      this.formatTaggedUsers();
      this.entry.content = customData;
      if(this.ableForFeedback) {
        this.entriesService.saveEntry({entry: this.entry, feedbacks: customFeedbacks}).subscribe(response => {
          this.entry = new Entry();
          this.instance = undefined;
          this.showSuccessMessage = true;
        }, errors => {
          this.errors = errors;
        })
      } else {
        this.entriesService.saveEntry(this.entry).subscribe(response => {
          this.entry = new Entry();
          this.instance = undefined;
          this.showSuccessMessage = true;
        }, errors => {
          this.errors = errors;
        })
      }
    } else {
      this.errors = errors;
    }
  }

  formatMentionedUsers(): void {
    var temp=[];
    this.mentionedUsers = this.mentionedUsers.filter((x, i)=> {
      if (temp.indexOf(x.id) < 0) {
        temp.push(x.id);
        return true;
      }
      return false;
    })
    let mentioedUsers = this.mentionedUsers
    let newMentioedUsers = []
    if (mentioedUsers != undefined && mentioedUsers.length > 0) {
      let obj = {}
      mentioedUsers.forEach(mentionedUser => {
        obj['first_name'] = mentionedUser['first_name'];
        obj['last_name'] = mentionedUser['last_name'];
        obj['email'] = mentionedUser['email'];
        obj['full_name'] = mentionedUser['full_name'];
        obj['display_name'] = mentionedUser['full_name'];
        obj['id'] = mentionedUser['id'];
        obj['internal_id'] = mentionedUser['id'] || mentionedUser['internal_id'];
        obj['external_id'] = mentionedUser['id'] || mentionedUser['external_id'];
        newMentioedUsers.push(Object.assign({}, obj));
      })
      this.mentionedUsers = newMentioedUsers;
    }
  }

  formatMentionedTags(): void {
    var temp=[];
    this.mentionedTags = this.mentionedTags.filter((x, i)=> {
      if (temp.indexOf(x) < 0) {
        temp.push(x);
        return true;
      }
      return false;
    })
  }

  formatTaggedUsers(): void {
    let taggedUsers = this.entry.tagged_users
    let newTaggedUsers = []
    if (taggedUsers != undefined && taggedUsers.length > 0) {
      let obj = {}
      taggedUsers.forEach(mentionedUser => {
        obj['first_name'] = mentionedUser['first_name'];
        obj['last_name'] = mentionedUser['last_name'];
        obj['email'] = mentionedUser['email'];
        obj['full_name'] = mentionedUser['full_name'];
        obj['display_name'] = mentionedUser['full_name'];
        obj['id'] = mentionedUser['id'];
        obj['internal_id'] = mentionedUser['id'];
        obj['external_id'] = mentionedUser['id'];
        newTaggedUsers.push(Object.assign({}, obj))
      })
      this.entry.tagged_users = newTaggedUsers;
    }
  }

  frameCustomData(customData): {} {
    let newBillingHead = [];
    let billing_head = customData.billing_head;
    if (billing_head != undefined && billing_head.length > 0) {
      billing_head.forEach(billingHead => {
        let obj = {}
        obj['display_name'] = billingHead.display_name;
        obj['manager'] = billingHead.manager;
        obj['internalId'] = billingHead.id;
        obj['id'] = billingHead.id;
        obj['external_id'] = billingHead.id;
        obj['internal_id'] = billingHead.id;
        newBillingHead.push(Object.assign({}, obj))
      })
      customData.billing_head = newBillingHead;
    }
    let newRelatedTo = [];
    let relatedTo = customData.related_to;
    if (relatedTo != undefined && relatedTo.length > 0) {
      relatedTo.forEach(user => {
        let obj = {}
        obj['first_name'] = relatedTo['first_name'];
        obj['last_name'] = relatedTo['last_name'];
        obj['email'] = relatedTo['email'];
        obj['full_name'] = relatedTo['full_name'];
        obj['display_name'] = relatedTo['full_name'];
        obj['id'] = relatedTo['id'];
        obj['internal_id'] = relatedTo['id'];
        obj['external_id'] = relatedTo['id'];
        newRelatedTo.push(Object.assign({}, obj))
      })
      customData.related_to = newRelatedTo;
    }
    return customData;
  }

  formatSharees(): void {
    let sharees = this.entry.shared_with;
    let newSharees = []
    if (sharees != undefined && sharees.length > 0) {
      let obj = {}
      sharees.forEach(sharee => {
        obj['first_name'] = sharee['first_name'];
        obj['last_name'] = sharee['last_name'];
        obj['email'] = sharee['email'];
        obj['full_name'] = sharee['full_name'];
        obj['display_name'] = sharee['full_name'];
        obj['id'] = sharee['id'];
        obj['internal_id'] = sharee['id'];
        obj['external_id'] = sharee['id'];
        newSharees.push(obj)
      })
      this.entry.shared_with = newSharees;
    }
  }

  checkForNewTags(innerText): void {
    let wordsArr = innerText.split(" ");
    wordsArr.forEach(word => {
      if(word.startsWith("#")) {
        this.mentionedTags.push(word.substr(1))
      }
    })
  }

  getTaggingUsers(query): void {
    this.userService.getUsersByName(query)
    .subscribe(users => {
      this.users = users.employees
    })
  }


  // New Schema Test
  getLevelZeroEntryTypes(): void {
    this.entryTypesService.getLevelZeroTypes()
    .subscribe(entryTypes => {
      this.levelZeroEntryTypes = entryTypes;
    })
  }

  getLevelOneEntryTypes(): void {
    this.entry.task_type_id = null;
    this.entry.task_sub_type_id = null;
    this.entryTypesService.getLevelOneTypes(this.entry.level_zero_type_id)
    .subscribe(entryTypes => {
      this.levelOneEntryTypes = entryTypes;
    })
  }

  getLevelTwoEntryTypes(): void {
    this.entry.task_sub_type_id = null;
    this.entryTypesService.getLevelTwoTypes(this.entry.task_type_id)
    .subscribe(entryTypes => {
      this.levelTwoEntryTypes = entryTypes;
    })
  }

  getDynamicContent(event): void {
    if(event && event.instant_feedback) {
      this.ableForFeedback = true;
      this.feedbacks = [];
    } else if (event && !event.instant_feedback) {
      this.ableForFeedback = false;
      this.feedbacks = [];
    }
    this.addFeedback = false;
    this.entry.content = {}
    this.entry.description = "";
    this.entry.shared_with = [];
    this.entry.sharing_level = undefined;
    this.entry.tagged_users = [];
    let id = null
    if (this.entry.task_sub_type_id != null && this.entry.task_sub_type_id != undefined) {
      id = this.entry.task_sub_type_id
    } else {
      id = this.entry.task_type_id
    }
    this.entryTypesService.getCustomFields(id)
    .subscribe(customFields => {
      this.loadDynamicComponent(customFields.custom_fields.create_url);
    })
    const _this = this;
  }

  showAccessibility(): Boolean {
    let flag = false;
    if (this.entry.level_zero_type_id) {
      if (this.levelOneEntryTypes.length == 0 || this.entry.task_type_id != null) {
        flag = true;
      } else if (this.levelTwoEntryTypes.length == 0 || this.entry.task_sub_type_id != null) {
        flag = true;
      }
    }
    return flag;
  }

  getEntryTypesForButtons(): void {
    this.entryTypesService.getWorklogSubEntryTypes()
    .subscribe(worklog_types => {
      this.worklog_types = worklog_types;
    })
    this.entryTypesService.getFeedbackSubEntryTypes()
    .subscribe(feedback_types => {
      this.feedback_types = feedback_types;
    })
  }

  getLevelTwoEntryTypesButton(type): void {
    this.entry.task_type_id = type.id;
    this.entry.task_sub_type_id = null;
    this.entryTypesService.getLevelTwoTypes(this.entry.task_type_id)
    .subscribe(entryTypes => {
      this.levelTwoEntryTypes = entryTypes;
      if (entryTypes.length == 0) {
        this.getDynamicContent(type);
      } else {
        this.ableForFeedback = false;
        this.addFeedback = false;
        this.feedbacks = [];
      }
      const _this = this;
      setTimeout(function() {
        $("#autocomplete-textarea").textcomplete([
          {
            matchHash: /(^|\s)#(\w*(?:\s*\w*))$/,
            matchAtTheRate: /(^|\s)@(\w*(?:\s*\w*))$/,
            search: function(query, currentStrategy, callback) {
              let lastQuery = query;
              if(currentStrategy == "hash") {
                _this.tagService.getOpenSuggestions(query)
                .subscribe(suggestions => {
                  callback(suggestions);
                })
              } else if (currentStrategy == "atTheRate") {
                _this.userService.getUsersByName(query)
                .subscribe(suggestions => {
                  callback(suggestions.employees);
                })
              }
            },
            // #5 - Template used to display each result obtained by the Algolia API
            template: function (currentStrategy, hit) {
              if(currentStrategy == 'hash') {
                return hit;
              } else if (currentStrategy == 'atTheRate') {
                return hit.full_name;
              }
            },
            // #6 - Template used to display the selected result in the textarea
            replace: function (hit, currentStrategy) {
              if(currentStrategy == 'hash') {
                // _this.mentionedTags.push(hit);
                var html = ' <a class="tag-item" href="">';
                html += '<span class="label">' + hit + '</span></a> ';
                return html;
              } else if (currentStrategy == 'atTheRate') {
                _this.mentionedUsers.push(hit);
                var html = ` <a class="tag-item-user ${hit.id}" href="">`;
                html += '<span class="label">' + hit.full_name + '</span></a> ';
                return html;
              }
            }
          }
        ], {
          adapter: $.fn.textcomplete.HTMLContentEditable,
            // footer: '<div style="text-align: center; display: block; font-size:12px; margin: 5px 0 0 0;">Powered by <a href="http://www.algolia.com"><img src="https://www.algolia.com/assets/algolia128x40.png" style="height: 14px;" /></a></div>'
        });
      }, 2000)
  
      setTimeout(function() {
        document.querySelector('#autocomplete-textarea').addEventListener('keydown', function(event) {
          // Check for a backspace
          if (event['which'] == 8) {
              let s = window.getSelection();
              let r = s.getRangeAt(0)
              let el = r.startContainer.parentElement.parentElement
              // Check if the current element is the .label
              if (el.classList.contains('tag-item') || el.classList.contains('tag-item-user')) {
                  // Check if we are exactly at the end of the .label element
                  event.preventDefault();
                  el.remove();
                  // if (r.startOffset == r.endOffset && r.endOffset == el.textContent.length) {
                  //     // prevent the default delete behavior
                  //     event.preventDefault();
                  //     // if (el.classList.contains('highlight')) {
                  //     //   // remove the element
                  //     //   el.remove();
                  //     // } else {
                  //     //   el.classList.add('highlight');
                  //     // }
                  //     el.remove();
                  //     return;
                  // }
              }
          }
          // event.target.querySelectorAll('span.label.highlight').forEach(function(el) { el.classList.remove('highlight');})
        });
      }, 2000)
    })
  }

  handleFeedbackClick(): void {
    let entry = new Entry();
    entry.description = {
      text: ""
    }
    this.feedbacks.push(entry);
    this.currentFeedback = entry;
    this.generateDynamicDataForFeedback();
    this.showModal = true;
    this.currentFeedbackIndex = 0;
  }

  addAnotherFeedback(): void {
    this.showModal = true;
    let entry = new Entry();
      entry.description = {
        text: ""
      }
    this.feedbacks.push(entry);
    this.currentFeedback = entry;
    this.currentFeedbackIndex = this.feedbacks.length - 1;
    this.generateDynamicDataForFeedback();
    // this.loadDynamicComponentInstantFeedback('/feedback-others-form-template.html', {})
  }

  closeFeedbackModal(): void {
    this.showModal = false;
    console.log(this.currentFeedbackIndex)
    this.feedbacks[this.currentFeedbackIndex].content = this.childFeedbacks['_results'][0].data;
    console.log(this.feedbacks)
  }

  deleteInstantFeedback(index): void {
    this.feedbacks.splice(index,1)
  }

  showInstantFeedback(index): void {
    this.feedbackInitialData = this.feedbacks[index].content
    this.currentFeedbackIndex = index;
    this.showModal = true;
    this.currentFeedback = this.feedbacks[index];
  }

  generateDynamicDataForFeedback(): void {
    const _this = this;
    let children = $('#autocomplete-textarea')[0].children
    children = Array.prototype.slice.call( children )
    let userIds = []
    this.mentionedTags = []
    children.forEach(child => {
      if (child.classList.contains('tag-item-user')) {
        userIds.push(child.classList[1]);
      }
    })
    let taggedUsers = cloneDeep(this.mentionedUsers);
    var temp=[];
    taggedUsers = taggedUsers.filter((x, i)=> {
      if (temp.indexOf(x.id) < 0) {
        temp.push(x.id);
        return true;
      }
      return false;
    })
    taggedUsers = taggedUsers.filter(user => {
      return userIds.includes(user.id.toString())
    })
    this.feedbackInitialData = Object.assign({}, _this.instance.data);
    this.feedbackInitialData['related_to'] = taggedUsers;
  }
}
