import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClashService {
  private apiUrl = 'https://api.clashofclans.com/v1/players';

  constructor(private readonly httpService: HttpService) {}

  async verifyToken(playerTag: string, token: string) {
    const url = `${this.apiUrl}/${encodeURIComponent(playerTag)}/verifytoken`;
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, { token }, {
          headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE1ZTgyOGI3LWRmNDQtNDIzYy1iMTA1LTBlOTUxY2NhYzFiMSIsImlhdCI6MTc0MjkxNjM1Niwic3ViIjoiZGV2ZWxvcGVyL2MzZDc0M2Q5LWZjODQtMzg1My1hYmZkLWU3NWRmZmU5Zjk5NSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE3OS42MC43Mi4yIl0sInR5cGUiOiJjbGllbnQifV19.vU0FGznOb7w51wY-u2TwTrgv_5DDtUSwsIlPM4Cg2I_JtbXnXwqZ5NFCdpvlPIxej2AyyZe2SNGOc-bR-jS4Xw` },
        })
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error al verificar el token: ${error.response?.data?.message || error.message}`);
    }
  }
}

