import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SpaceService } from "./SpaceService";

@Entity()
export class Rate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  currency: string;

  @Column({ nullable: false })
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SpaceService, (spaceService) => spaceService.rates)
  spaceService: SpaceService;
}
