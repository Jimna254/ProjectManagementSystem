
CREATE OR ALTER PROCEDURE createProject(
    @project_id VARCHAR(250),
    @projectname VARCHAR(250),
    @description VARCHAR(1000) , 
    @createdate VARCHAR (200),
    @enddate VARCHAR(200)
   
  ) 
  AS
  BEGIN
    INSERT INTO Projects(project_id, projectname, description, createdate, enddate)
    VALUES(@project_id, @projectname, @description, @createdate,@enddate)
  END
   