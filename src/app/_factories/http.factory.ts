import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { HttpService } from '../_services';

export function httpFactory(backend: XHRBackend, options: RequestOptions, router: Router, snackBar: MdSnackBar) {
  return new HttpService(backend, options, router, snackBar)
}