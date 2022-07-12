import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
