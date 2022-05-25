import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { PremiumCalculatorService } from '../services/premium-calculator.service'

@Component({
  selector: 'app-monthly-premium',
  templateUrl: './monthly-premium.component.html',
  styleUrls: ['./monthly-premium.component.css']
})
export class MonthlyPremiumComponent implements OnInit {

  // reactive form property
  _form = this.fb.group({
    name: ["", [Validators.required, Validators.maxLength(20)]],
    dob: ["", [Validators.required, this.invalidAge]], //custom validator used for age restriction
    age: ["", []],
    deathCoverAmount: ["", [Validators.required, Validators.maxLength(8), Validators.min(1)]], 
    occupation: ["", [Validators.required]]
  });

  todayDate: Date = new Date();
  _age: number = null;
  OccupationList: any;
  monthlyPremiumAmount: any;
  submitted: boolean = false;
  outputLable: string = null;

  constructor(public fb: FormBuilder, public premiumCalculatorService: PremiumCalculatorService) { }
  ngOnInit() {
    this.todayDate = new Date();
    this.GetOccupationList();
  }

  GetOccupationList() {
    this.premiumCalculatorService.GetOccupationList().subscribe(data => {
      this.OccupationList = data;
    },
      (error) => {
        console.log("Error from angular component: " + error);
      });
  }


  CalculatePremium() {
    this.submitted = true;
    this.monthlyPremiumAmount = null;
   
    if (this._form.status != "VALID")
      return false;

    this.outputLable = "Calculating...";
    this.premiumCalculatorService.CalculatePremium(this._form.value).subscribe(data => {
      this.outputLable = "Monthly Premium : ";
      this.monthlyPremiumAmount = data;
    },
      (error) => {
        this.monthlyPremiumAmount = error;
        this.outputLable = error;
        console.log("Error from angular component: " + error);
      });
  }


  CalculateAge(dob: Date) {    //display age based on DOB selection
    dob = new Date(dob);
    var diffYear = (this.todayDate.getTime() - dob.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    var years = Math.abs(Math.round(diffYear / 365.25));

    if (years)
      this._age = years;
    else
      this._age = null;

    this._form.patchValue({ age: this._age }); //--set/patch value for age reactive form control
  }


  // custome validator for reactive form group -  to restrict age condition
  invalidAge(control: AbstractControl): { [key: string]: boolean } | null {
    var _controlVal = new Date(control.value);
    var diffYear = (new Date().getTime() - _controlVal.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    var years = Math.abs(Math.round(diffYear / 365.25));
    if (years < 18 || years > 99) {
      return { "AgeRestriction": true }

    }
    return null
  }

  alphabetOnly(e) {  // Accept only alphabets , not special characters 
    var regex = new RegExp("^[a-zA-Z ]+$");
    this.validateRegex(e, regex);
  }
  numberLimit(e) {    //Accept only numbers
    var regex = new RegExp("^[0-9]+$");
    this.validateRegex(e, regex);
  }

  validateRegex(e, regex) {
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }

    this.disableKeypress(e);
  }

  disableKeypress(e) {
    e.preventDefault();
    return false;
  }
}
