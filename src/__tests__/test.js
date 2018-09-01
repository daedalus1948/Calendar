import actions from './../store/actions.js';
import actionCreators from './../store/actionCreators.js';
import helpers from './../store/helpers.js';
import selectors from './../store/selectors.js';
import reducers from './../store/reducers.js';
import { validatorManager, nameValidator, dateRangeValidator } from './../store/validators.js';

describe('CALENDAR APP', () => {
  
  describe('HELPERS SUITE', () => {

    let one = {name:"one", start:{hour: "22",minute: "30"}, end:{hour: "23",minute: "05"}};
    let two = {name:"two", start:{hour: "15",minute: "30"}, end:{hour: "17",minute: "40"}};
    let three = {name:"three", start:{hour: "17",minute: "30"}, end:{hour: "18",minute: "05"}};
    let four = {name:"four", start:{hour: "5",minute: "30"}, end:{hour: "7",minute: "05"}};
    let five = {name:"five", start:{hour: "20",minute: "30"}, end:{hour: "20",minute: "45"}};

    const mockData = [one, two, three, four, five];
    const testData = [...mockData];
    testData.sort(helpers.sorter);


    it('sorter sorts objects by their combined starting date key from lowest to highest', () => {
      expect(testData[0].name).toMatch('four');
      expect(testData[2].name).toMatch('three');
      expect(testData[4].name).toMatch('one');
    });

    it('dateRangeOverlap returns true if two dates overlap each other', () => {
      expect(helpers.dateRangeOverlap(two,three)).toBe(true);
      expect(helpers.dateRangeOverlap(two,four)).toBe(false);
      expect(helpers.dateRangeOverlap(one,five)).toBe(false);
    });

    it('calendarGenerator generates all days (including the leap year) correctly', () => {
      expect(Object.keys(helpers.calendarGenerator(2000, 1)[2000][2])).toHaveLength(29);
      expect(Object.keys(helpers.calendarGenerator(1900, 1)[1900][2])).toHaveLength(28);
      expect(Object.keys(helpers.calendarGenerator(1766, 1)[1766][8])).toHaveLength(31);
    });

  })


  describe('SELECTORS SUITE', () => {

    const mockState = {"2000":{"1":{"1":[], "2":[]}}, "1999":{"1":{"1":[]}}};
    mockState[2000][1][1].push({id:"1", name:"one", start:{hour: "22",minute: "30"}, end:{hour: "23",minute: "05"}});
    mockState[2000][1][1].push({id:"2", name:"two", start:{hour: "15",minute: "30"}, end:{hour: "17",minute: "40"}});
    mockState[2000][1][1].push({id:"3", name:"three", start:{hour: "17",minute: "30"}, end:{hour: "18",minute: "05"}});
    mockState[2000][1][1].push({id:"4", name:"four", start:{hour: "5",minute: "30"}, end:{hour: "7",minute: "05"}});
    mockState[2000][1][1].push({id:"5", name:"five", start:{hour: "20",minute: "30"}, end:{hour: "20",minute: "45"}});


    it('check() correctly returns true/false based on state and other parameters', () => {
      expect(selectors.check(mockState, 2000, 1, 1)).toBe(true);
      expect(selectors.check(mockState, 2000, 1, 7)).toBe(false);
      expect(selectors.check(mockState, 2000, 3, 1)).toBe(false);
      expect(selectors.check(mockState, 2003, 1, 1)).toBe(false);
      expect(selectors.check(mockState, 2003, 1)).toBe(false);
      expect(selectors.check(mockState, 2000)).toBe(true);
    });

    it('getYears() returns an array of correct state years', () => {
      expect(selectors.getYears(mockState)).toHaveLength(2);
      expect(selectors.getYears(mockState)).toContain("1999");
      expect(selectors.getYears(mockState)).toContain("2000");
    });

    it('getMonths() returns an array of correct state months', () => {
      expect(selectors.getMonths(mockState, 2000)).toHaveLength(1);
      expect(selectors.getMonths(mockState, 2000)).toContain("1");
      expect(selectors.getMonths(mockState, 2003)).toBe(undefined);
    });

    it('getDays() returns an array of correct state days', () => {
      expect(selectors.getDays(mockState, 2000, 1)).toHaveLength(2);
      expect(selectors.getDays(mockState, 2000, 1)).toContain("1");
      expect(selectors.getDays(mockState, 2000, 1)).toContain("2");
      expect(selectors.getDays(mockState, 2000, 3)).toBe(undefined);
    });

    it('getAllAppointmentsPerDay() returns an array of all appointments', () => {
      expect(selectors.getAllAppointmentsPerDay(mockState, 2000, 1, 1)).toHaveLength(5);
      expect(selectors.getAllAppointmentsPerDay(mockState, 2000, 1, 2)).toHaveLength(0);
      expect(selectors.getAllAppointmentsPerDay(mockState, 2000, 1, 7)).toBe(undefined);
    });

    it('getAppointmentByID() returns the selected Appointment by ID', () => {
      expect(selectors.getAppointmentByID(mockState, 2000, 1, 1, "6")).toBe(undefined);
      expect(selectors.getAppointmentByID(mockState, 2000, 1, 1, "4")).toBeDefined();
    });

    it('getAppointmentByName() returns the selected Appointment by Name', () => {
      expect(selectors.getAppointmentByName(mockState, 2000, 1, 1, "unknownName")).toBe(undefined);
      expect(selectors.getAppointmentByName(mockState, 2000, 1, 1, "three")).toBeDefined();
    });

  })


  describe('VALIDATORS SUITE', () => {

    const mockState = {"2000":{"1":{"1":[], "2":[]}}, "1999":{"1":{"1":[]}}};
    const mockDate = {year:"2000", month:"1", day:"1"}; // triggers an error
    const mockDateValid = {year:"1999", month:"1", day:"1"}; // triggers an error
    const mockAppointment = {id:"77", name:"one", start:{hour: "10",minute: "30"}, end:{hour: "23",minute: "55"}}; // triggers an error
    const mockAppointmentValid = {id:"77", name:"newName", start:{hour: "10",minute: "30"}, end:{hour: "23",minute: "55"}}; // triggers an error
    
    const mockActionInvalid = {type:'_', payload:{date: mockDate, data: mockAppointment}}
    const mockActionValid = {type:'_', payload:{date: mockDateValid, data: mockAppointmentValid}}

    mockState[2000][1][1].push({id:"1", name:"one", start:{hour: "22",minute: "30"}, end:{hour: "23",minute: "05"}});
    mockState[2000][1][1].push({id:"2", name:"two", start:{hour: "15",minute: "30"}, end:{hour: "17",minute: "40"}});
    mockState[2000][1][1].push({id:"3", name:"three", start:{hour: "17",minute: "30"}, end:{hour: "18",minute: "05"}});
    mockState[2000][1][1].push({id:"4", name:"four", start:{hour: "5",minute: "30"}, end:{hour: "7",minute: "05"}});
    mockState[2000][1][1].push({id:"5", name:"five", start:{hour: "20",minute: "30"}, end:{hour: "20",minute: "45"}});


    it('nameValidator() throws "name already exists" error', () => {
      expect(()=>nameValidator(mockState, mockActionInvalid)).toThrow();
      expect(()=>nameValidator(mockState, mockActionValid)).not.toThrow();

    });

    it('dateRangeValidator() throws "date range overlap" error', () => {
      expect(()=>dateRangeValidator(mockState, mockAction)).toThrow();
      expect(()=>dateRangeValidator(mockState, mockActionValid)).not.toThrow();
    });

    it('validatorManager() throws a composite error', () => {
      expect(()=>validatorManager(mockState, mockAction, [nameValidator, dateRangeValidator])).toThrow();
      expect(()=>validatorManager(mockState, mockActionValid, [nameValidator, dateRangeValidator])).not.toThrow();
    });

  })


  describe('REDUCERS SUITE ', () => {

    const oldMockAppointmentEdited = {id:'1', name:'name1-edited', description:'des1', priority:'low',
                                      start:{hour:'1', minute:'00'}, end:{hour:'2', minute:'00'}};
    const oldMockAppointment = {id:'1', name:'name1', description:'des1', priority:'low',
                                start:{hour:'1', minute:'00'}, end:{hour:'2', minute:'00'}};
    const mockAppointment = {id:'2', name:'name2', description:'des2', priority:'medium',
                              start:{hour:'3', minute:'00'}, end:{hour:'4', minute:'00'}};
    const mockDate = {year:'1999', month:'1', day:'1'};

    const mockState = {"2000":{"1":{"1":[], "2":[]}}, "1999":{"1":{"1":[oldMockAppointment]}}};

    const mockActionADD = {type:'ADD_APPOINTMENT', payload:{date: mockDate, data: mockAppointment}}
    const mockActionEDIT = {type:'EDIT_APPOINTMENT', payload:{date: mockDate, data: oldMockAppointmentEdited}}
    const mockActionDELETE = {type:'DELETE_APPOINTMENT', payload:{date: mockDate, data: oldMockAppointment}}
    const mockActionUNKNOWN = {type:'UNKNOWN', payload:{date: mockDate, data: mockAppointment}}

    const mockLogic = () => []; // return an empty array


    it('dateDeepCopy() should return a deep copied date object tree with logic()', () => {
      expect(reducers.dateDeepCopy(mockState, mockActionADD, mockLogic))
      .toEqual({
          ...mockState,
          [mockActionADD.payload.date.year] : {
              ...mockState[mockActionADD.payload.date.year],
              [mockActionADD.payload.date.month] : {
                  ...mockState[mockActionADD.payload.date.year][mockActionADD.payload.date.month],
                  [mockActionADD.payload.date.day] : []
              }
          }
      })
    })

    it('calendarReducer() properly handles ADD_APPOINTMENT', () => {
      expect(reducers.calendarReducer(mockState, mockActionADD))
        .toEqual({
          ...mockState,
          [mockActionADD.payload.date.year] : {
              ...mockState[mockActionADD.payload.date.year],
              [mockActionADD.payload.date.month] : {
                  ...mockState[mockActionADD.payload.date.year][mockActionADD.payload.date.month],
                  [mockActionADD.payload.date.day] : [oldMockAppointment, mockAppointment]
              }
          }
      })
    })

    it('calendarReducer() properly handles EDIT_APPOINTMENT', () => {
      expect(reducers.calendarReducer(mockState, mockActionEDIT))
        .toEqual({
          ...mockState,
          [mockActionEDIT.payload.date.year] : {
              ...mockState[mockActionEDIT.payload.date.year],
              [mockActionEDIT.payload.date.month] : {
                  ...mockState[mockActionEDIT.payload.date.year][mockActionEDIT.payload.date.month],
                  [mockActionEDIT.payload.date.day] : [oldMockAppointmentEdited]
              }
          }
      })
    })

    it('calendarReducer() properly handles DELETE_APPOINTMENT', () => {
      expect(reducers.calendarReducer(mockState, mockActionDELETE))
        .toEqual({
          ...mockState,
          [mockActionDELETE.payload.date.year] : {
              ...mockState[mockActionDELETE.payload.date.year],
              [mockActionDELETE.payload.date.month] : {
                  ...mockState[mockActionDELETE.payload.date.year][mockActionDELETE.payload.date.month],
                  [mockActionDELETE.payload.date.day] : []
              }
          }
      })
    })

    it('calendarReducer() properly handles default case', () => {
      expect(reducers.calendarReducer(mockState, mockActionUNKNOWN))
        .toEqual({
          ...mockState,
          [mockActionUNKNOWN.payload.date.year] : {
              ...mockState[mockActionUNKNOWN.payload.date.year],
              [mockActionUNKNOWN.payload.date.month] : {
                  ...mockState[mockActionUNKNOWN.payload.date.year][mockActionUNKNOWN.payload.date.month],
                  [mockActionUNKNOWN.payload.date.day] : [oldMockAppointment]
              }
          }
      })
    })

  })


  describe('ACTION CONSTANTS SUITE', () => {
    
    it('ADD_APPOINTMENT constant matches', () => {
      expect(actions.ADD_APPOINTMENT).toMatch('ADD_APPOINTMENT');
    })
    
    it('EDIT_APPOINTMENT constant matches', () => {
      expect(actions.EDIT_APPOINTMENT).toMatch('EDIT_APPOINTMENT');
    })

    it('DELETE_APPOINTMENT constant matches', () => {
      expect(actions.DELETE_APPOINTMENT).toMatch('DELETE_APPOINTMENT');
    })

  })


  describe('ACTION CREATORS SUITE', () => {
    
    const mockAppointment = {id:'2', name:'name2', description:'des2', priority:'medium',
                            start:{hour:'3', minute:'00'}, end:{hour:'4', minute:'00'}};
    const mockDate = {year:'1999', month:'1', day:'1'};

    const mockActionADD = {type:'ADD_APPOINTMENT', payload:{date: mockDate, data: mockAppointment}};
    const mockActionEDIT = {type:'EDIT_APPOINTMENT', payload:{date: mockDate, data: mockAppointment}};
    const mockActionDELETE = {type:'DELETE_APPOINTMENT', payload:{date: mockDate, data: {id: mockAppointment.id}}};


    it('addAppointmentActionCreator() returns the correct action object data structure', () => {
      expect(actionCreators.addAppointmentActionCreator(mockDate, mockAppointment))
        .toEqual(mockActionADD);
    });

    it('editAppointmentActionCreator() returns the correct action object data structure', () => {
      expect(actionCreators.editAppointmentActionCreator(mockDate, mockAppointment))
        .toEqual(mockActionEDIT);
    });

    it('deleteAppointmentActionCreator() returns the correct action object data structure', () => {
      expect(actionCreators.deleteAppointmentActionCreator(mockDate, mockAppointment))
        .toEqual(mockActionDELETE);
    });

  })

})
