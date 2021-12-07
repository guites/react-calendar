# React Calendar App

originally a fork from <https://github.com/portexe/ReactCalendar>

This repo will be the acting front end to a [nodejs webpush app](https://github.com/guites/webpush-notifications-nodejs)

## About

A simple react calendar application, where users can browse the callendar and add multiple tasks to any day, as long as they dont conflict in time.

It currently uses localStorage to persist information, but I plan on integrating with a nodejs backend using sqlite3.

This is a study project.

### Checklist

- [x] jump to desired month/year
- [x] edit existing events
- [ ] add multiple events to the same day, prevent concurrent events from being added
    - [x] edit single events instead of the whole day
    - [ ] delete single events instead of the whole day
    - [ ] add multiple events to the same day making the NewEventModal component a subcomponent of ViewEventsModal
    - [ ] prevent concurrent events from being added 
- [ ] save event create/update timestamp
- [ ] show all existing events in a list
- [ ] mark past events as concluded/cancelled
- [ ] leave a closing comment on past events
