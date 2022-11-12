-- Creation de la vue VM1 

Create MATERIALIZED VIEW VM1 
BUILD IMMEDIATE 
REFRESH COMPLETE ON DEMAND 
ENABLE QUERY REWRITE 
AS SELECT * FROM Transaction WHERE (
    (TypeT=2 )
    and(  DateT >= to_date('2021/01/01', 'yyyy/mm/dd')
    and DateT <= to_date('2021/01/30', 'yyyy/mm/dd'))
);

-- Creation de la vue VM2
Create MATERIALIZED VIEW VM2 
BUILD IMMEDIATE 
REFRESH FAST ON DEMAND 
ENABLE QUERY REWRITE 
AS SELECT * FROM Transaction WHERE ((TypeT=2 )and(  DateT >= to_date('2021/01/01', 'yyyy/mm/dd') and DateT <= to_date('2021/01/30', 'yyyy/mm/dd')));

-- Test 
-- insertion 
Declare 
CodeT number;
DateT date;
TypeT number;
CodeBI number ;
CodeCL number;
CodeVS number;
Mensual number;  
MontantV number;
begin
for CodeT in 1332788..1332797 loop 
select floor(dbms_random.value(1,2.9)) into TypeT from dual;
select floor(dbms_random.value(10000,42250.9)) into MontantV from dual;
select floor(dbms_random.value(700,30000.9)) into Mensual from dual;
select floor(dbms_random.value(1,800255.9)) into CodeCL from dual;
select floor(dbms_random.value(1,232707.9)) into CodeBI from dual;
select floor(dbms_random.value(1,1650220.9)) into CodeVS from dual;
select to_date(trunc(dbms_random.value(to_char(DATE '2020-01-01','J'),to_char(date '2022-12-31','J'))),'J') into DateT from dual;
insert into Transaction values(CodeT,DateT,TypeT,decode(TypeT,1,Mensual,0),decode(TypeT,2,MontantV,0),CodeVS,CodeBI,CodeCl);
end loop;
commit;
end;
/

EXEC DBMS_MVIEW.refresh('VM1');
EXEC DBMS_MVIEW.refresh('VM2');

--Modify 

update Transaction set Mensual=30000 where Mensaul>10001 and  Mensual<20000;
EXEC DBMS_MVIEW.refresh('VM1');
EXEC DBMS_MVIEW.refresh('VM2');

--suppression 
delete from Transaction where TypeT=2;
EXEC DBMS_MVIEW.refresh('VM1');
EXEC DBMS_MVIEW.refresh('VM2');



--creation de VM3 contenant les transactions des biens de type "villa" en utilisant les options (DEFERRED, COMPLETE, ON COMMIT)
Create MATERIALIZED VIEW VM3
BUILD DEFERRED 
REFRESH COMPLETE ON COMMIT 
ENABLE QUERY REWRITE 
AS SELECT * FROM Transaction t TypeBien tb BienImmobilier bi WHERE (t.);
 