import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OccupationPlace {
  placeId: number;
  seanceId: number;
}

@Injectable({ providedIn: 'root' })
export class DisponibilitePlacesService {
  private readonly http = inject(HttpClient);

  public findAll(): Observable<OccupationPlace[]> {
    return this.http.get<OccupationPlace[]>('/api/detailAchat');
  }
}
