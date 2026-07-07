import { ChangeDetectionStrategy, Component } from '@angular/core';

import { APP_CONSTANTS } from '../../core/constants/app.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly app = APP_CONSTANTS;
  protected readonly appName = APP_CONSTANTS.APP_NAME;
  protected readonly version = APP_CONSTANTS.APP_VERSION;
  protected readonly copyrightYear = APP_CONSTANTS.COPY_RIGHT_YEAR;
}
