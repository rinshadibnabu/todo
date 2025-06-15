CREATE TABLE "todoapp_todo" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "todoapp_todo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todoapp_user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "todoapp_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"password" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todoapp_todo" ADD CONSTRAINT "todoapp_todo_userId_todoapp_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."todoapp_user"("id") ON DELETE no action ON UPDATE no action;