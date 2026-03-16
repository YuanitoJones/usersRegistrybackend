import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './models/student/entities/student.entity';
import { StudentModule } from './models/student/student.module';
import { PhoneModule } from './models/phone/phone.module';
import { EmailModule } from './models/email/email.module';
import { AddressModule } from './models/address/address.module';
import { Phone } from './models/phone/entities/phone.entity';
import { Email } from './models/email/entities/email.entity';
import { Address } from './models/address/entities/address.entity';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: 'SQL_SERVER_3581321',
        database: 'usersRegistry',
        options: {
          trustServerCertificate: true,
        },
        entities: [Student, Phone, Email, Address],
        retryAttempts: 10,
        extra: {
          pool: {
            max: 20,
          },
        },
      }),
      dataSourceFactory: async (opts) => {
        if (!opts) throw new Error('Invalid options');
        return addTransactionalDataSource(new DataSource(opts));
      },
    }),
    StudentModule,
    PhoneModule,
    EmailModule,
    AddressModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
