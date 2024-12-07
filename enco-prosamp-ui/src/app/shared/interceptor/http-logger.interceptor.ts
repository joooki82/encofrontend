import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Log the outgoing request
        console.log('HTTP Request Details:');
        console.log(`URL: ${req.url}`);
        console.log(`Method: ${req.method}`);
        console.log('Headers:');
        req.headers.keys().forEach(key => {
            console.log(`${key}: ${req.headers.get(key)}`);
        });

        // Pass the request to the next handler and log the response
        return next.handle(req).pipe(
            tap(event => {
                console.log('HTTP Response received for URL:', req.url);
            })
        );
    }
}

